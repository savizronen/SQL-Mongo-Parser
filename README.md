# SQL-Mongi-Parser
Converts SQL Queries to JSON.

![image](https://user-images.githubusercontent.com/72870423/186699864-7ff02a30-0a5c-4188-a3ad-c84a76164d45.png)

Queries SQL examples:

select * from custumers;
![image](https://user-images.githubusercontent.com/72870423/186699909-73dc2777-4c90-40d3-87dd-2154ae0b8c2d.png)
select * from custumers where city in ('rehovot','modiin');
![image](https://user-images.githubusercontent.com/72870423/186699976-7f6420f9-ddd4-46e5-bc6d-c0198f672c47.png)

Execute query by text:

select * from customers as customer join orders as orders on customer.cid = orders.cid;
![image](https://user-images.githubusercontent.com/72870423/186700058-cb2d8e36-b6ad-476d-851f-90f06e2c3379.png)

MongoDb Database example:
![image](https://user-images.githubusercontent.com/72870423/186677353-06b93448-9c83-41f3-a114-b1bfd08818b3.png)

Customers:
![image](https://user-images.githubusercontent.com/72870423/186676098-e94a7b64-8f25-4408-aad5-2265549c0a8d.png)
Orders:
![image](https://user-images.githubusercontent.com/72870423/186676170-f2fd7798-120b-4ae3-bb87-ce86d8f0bfa4.png)
OrderItems:
![image](https://user-images.githubusercontent.com/72870423/186676213-5206ab6a-d6ff-4341-8448-dee14d98f591.png)

