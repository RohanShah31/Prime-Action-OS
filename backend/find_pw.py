import sqlalchemy
from sqlalchemy import create_engine
passwords = ['', 'root', 'admin', 'password', '1234', '12345', '123456', 'prime', 'primeaction', 'mysql', '1111']
for p in passwords:
    try:
        e = create_engine(f'mysql+pymysql://root:{p}@localhost:3306/')
        e.connect()
        print(f'SUCCESS: Password is "{p}"')
        break
    except Exception as ex:
        pass
else:
    print('None of the common passwords worked.')
