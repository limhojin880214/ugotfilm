#!/usr/bin/env python
# coding: utf-8

# In[1]:


import sys

def sum(v1,v2):
    result = int(v1) + int(v2)
    print(result)


def main(argv):
    sum(argv[1], argv[2])

if __name__ == "__main__":
    main(sys.argv)


# In[2]:


import cx_Oracle
import os
import pandas as pd

LOCATION = r"C:\oraclexe"
os.environ["PATH"] = LOCATION + ";" + os.environ["PATH"] #환경변수 등록


# In[3]:


dsn=cx_Oracle.makedsn('localhost',1521,'xe')
db=cx_Oracle.connect('hr','a1234')

cursor=db.cursor()
#cursor.execute("select * from ugotfilm_movie_choice")
#for i in cursor:
#    print(i)


# In[4]:


df=pd.read_sql('select usercode, moviecode, count(*) as count from ugotfilm_movie_choice group by usercode, moviecode order by usercode', con=db)


# In[5]:


df


# In[6]:


user= 2


# In[7]:


recommendation_pivot = df.pivot(index='USERCODE', columns='MOVIECODE', values='COUNT')


# In[8]:


recommendation_pivot.fillna(0, inplace=True)


# In[9]:


recommendation_pivot


# In[10]:


def movie_seen(user_id):
  return recommendation_pivot.loc[user_id][recommendation_pivot.loc[user_id]>0]


# In[11]:


movie_seen(user)


# In[12]:


small_test = recommendation_pivot.T


# In[13]:


small_test


# In[14]:


small_test_corr = small_test.corr()
small_test_corr


# In[15]:


small_test_corr[user].sort_values(ascending=False)[1:11]


# In[16]:


def nearest_user(user_id, n):
  return small_test_corr.loc[user_id].sort_values(ascending=False)[1:n+1]


# In[17]:


res = nearest_user(user,1)


# In[18]:


res.index[0]


# In[19]:


movie_seen(res.index[0])


# In[20]:


movie_seen(user)


# In[21]:


unseen = set(movie_seen(res.index[0]).index) - set(movie_seen(user).index)


# In[22]:


print(unseen)


# In[ ]:




