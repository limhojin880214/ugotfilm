#!/usr/bin/env python
# coding: utf-8




import sys
import cx_Oracle
import os
import pandas as pd

# def movie_seen(user_id):
#   return recommendation_pivot.loc[user_id][recommendation_pivot.loc[user_id]>0]

# def nearest_user(user_id, n):
#   return small_test_corr.loc[user_id].sort_values(ascending=False)[1:n+1]

def curation(v1):
    LOCATION = r"C:\oraclexe"
    os.environ["PATH"] = LOCATION + ";" + os.environ["PATH"] #환경변수 등록
    
    dsn=cx_Oracle.makedsn('localhost',1521,'xe')
    db=cx_Oracle.connect('hr','a1234')

    cursor=db.cursor()
    
    df=pd.read_sql('select usercode, moviecode, count(*) as count from ugotfilm_movie_choice group by usercode, moviecode order by usercode', con=db)
    
    user= v1
    
    recommendation_pivot = df.pivot(index='USERCODE', columns='MOVIECODE', values='COUNT')
    recommendation_pivot.fillna(0, inplace=True)
    
    def movie_seen(user_id):
      return recommendation_pivot.loc[user_id][recommendation_pivot.loc[user_id]>0]

    def nearest_user(user_id, n):
      return small_test_corr.loc[user_id].sort_values(ascending=False)[1:n+1]

    small_test = recommendation_pivot.T
    small_test_corr = small_test.corr()
    
    small_test_corr[user].sort_values(ascending=False)[1:11]
    res = nearest_user(user,1)
    
    unseen = set(movie_seen(res.index[0]).index) - set(movie_seen(user).index)
    #print(unseen)
    print(10)


def main(argv):
    print('test')
    curation(argv[1])

if __name__ == "__main__":
    main(sys.argv)







