from neo4j import GraphDatabase

class GraphService:
    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def run_query(self, query, params=None):
        with self.driver.session() as session:
            return session.run(query, params or {})
