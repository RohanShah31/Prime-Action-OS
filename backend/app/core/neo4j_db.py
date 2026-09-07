from neo4j import GraphDatabase
import logging

class Neo4jConnection:
    def __init__(self, uri, user, pwd):
        self.__uri = uri
        self.__user = user
        self.__pwd = pwd
        self.__driver = None
        try:
            self.__driver = GraphDatabase.driver(self.__uri, auth=(self.__user, self.__pwd))
        except Exception as e:
            logging.error(f"Failed to create the driver: {e}")
        
    def close(self):
        if self.__driver is not None:
            self.__driver.close()
        
    def query(self, query, parameters=None):
        assert self.__driver is not None, "Driver not initialized!"
        session = None
        response = None
        try: 
            session = self.__driver.session()
            response = list(session.run(query, parameters))
        except Exception as e:
            logging.error(f"Query failed: {e}")
        finally:
            if session is not None:
                session.close()
        return response

# Connects to your running Docker container
graph_db = Neo4jConnection("bolt://localhost:7687", "neo4j", "supersecretpassword")