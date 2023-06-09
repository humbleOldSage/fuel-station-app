from sqlalchemy import create_engine

engine = create_engine('postgresql://satyam:satyam@localhost/stations')

# test the connection by executing a simple query
with engine.connect() as conn:
    result = conn.execute('SELECT 1;')
    print(result.fetchone())