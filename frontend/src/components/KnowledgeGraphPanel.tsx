'use client';

import React, { useState, useEffect } from 'react';
import { Card, Box, Typography, CircularProgress, Chip } from '@mui/material';
import HubIcon from '@mui/icons-material/Hub';
import dynamic from 'next/dynamic';

// Dynamically import the graph to prevent Next.js SSR 'window is not defined' errors
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

interface GraphNode {
  id: number;
  label: string;
  name: string;
}

interface GraphLink {
  source: number;
  target: number;
  type: string;
}

export default function KnowledgeGraphPanel() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [links, setLinks] = useState<GraphLink[]>([]);
  
  // We need to track the dimensions of the container so the canvas sizes perfectly
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch live data from your FastAPI Neo4j endpoint
    const fetchGraphData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/graph', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setNodes(data.nodes || []);
          setLinks(data.links || []);
          setIsOnline(data.status === 'online');
        } else {
          setIsOnline(false);
        }
      } catch (err) {
        setIsOnline(false);
      } finally {
        setLoading(false);
      }
    };

    fetchGraphData();
    const interval = setInterval(fetchGraphData, 10000);
    return () => clearInterval(interval);
  }, []);

  // Update canvas size when window resizes
  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      });
    }
  }, [loading, isOnline]);

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 400, boxShadow: '0 4px 24px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', borderRadius: '24px', bgcolor: '#ffffff', overflow: 'hidden' }}>
      
      {/* Header Area */}
      <Box sx={{ p: 2.5, px: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <HubIcon sx={{ color: '#000000' }} />
          <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Neo4j Knowledge Graph</Typography>
        </Box>
        <Chip 
          label={isOnline ? "LIVE ENGINE ONLINE" : "ENGINE OFFLINE"} 
          color={isOnline ? "success" : "error"} 
          size="small" 
          variant="outlined"
          sx={{ fontWeight: 'bold', fontSize: '0.65rem', height: 20, borderWidth: 2 }}
        />
      </Box>

      {/* Graph Visual Canvas Wrapper */}
      <Box 
        ref={containerRef}
        sx={{ flexGrow: 1, bgcolor: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }}
      >
        {loading ? (
          <CircularProgress sx={{ color: '#000000' }} />
        ) : !isOnline ? (
          <Box sx={{ textAlign: 'center', px: 2 }}>
            <Typography variant="body2" sx={{ color: '#ef4444', fontWeight: 'bold', mb: 1 }}>
              Backend Neo4j DB connection dropped.
            </Typography>
          </Box>
        ) : (
          /* The Interactive Graph Engine */
          <ForceGraph2D
            width={dimensions.width}
            height={dimensions.height}
            graphData={{ nodes, links }}
            nodeLabel="name" // Shows the name on hover
            nodeAutoColorBy="label" // Colors nodes differently based on their Neo4j Label
            linkDirectionalArrowLength={5} // Adds directional arrows to relationships
            linkDirectionalArrowRelPos={1}
            linkColor={() => '#cbd5e1'} // Light gray links for light mode
            nodeCanvasObject={(node: any, ctx, globalScale) => {
              // Custom text rendering for the nodes
              const label = node.name;
              const fontSize = 12/globalScale;
              ctx.font = `${Math.max(fontSize, 4)}px Sans-Serif`; // Ensure text doesn't disappear when zoomed out
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              
              // Draw node circle
              ctx.beginPath();
              ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI, false);
              ctx.fillStyle = node.color || '#3b82f6';
              ctx.fill();
              
              // Draw text label below the node
              ctx.fillStyle = '#475569'; // Dark gray text for light mode
              ctx.fillText(label, node.x, node.y + 12);
            }}
          />
        )}
      </Box>
    </Card>
  );
}