# SQL-Mongi-Parser
Converts SQL Queries to JSON.

![image](https://user-images.githubusercontent.com/72870423/186673927-dd775a39-ffaf-48df-af1f-a3af119d03b3.png)

Queries SQL examples:

select * from custumers
![image](https://user-images.githubusercontent.com/72870423/186674095-d10e8f41-c67d-472f-bd20-bf4ce3ded45f.png)
select * from custumers where city in ('rehovot','modiin')
![image](https://user-images.githubusercontent.com/72870423/186677696-69071706-c3bf-4cb9-be02-149874a1a3fc.png)

Execute query by text:
select * from customers as customer join orders as orders on customer.cid = orders.cid
![image](https://user-images.githubusercontent.com/72870423/186677780-2050ac56-9108-49e3-bd99-12db02ccd782.png)

MongoDb Database example:
![image](https://user-images.githubusercontent.com/72870423/186677353-06b93448-9c83-41f3-a114-b1bfd08818b3.png)

Customers:
![image](https://user-images.githubusercontent.com/72870423/186676098-e94a7b64-8f25-4408-aad5-2265549c0a8d.png)
OrderItems:
![image](https://user-images.githubusercontent.com/72870423/186676213-5206ab6a-d6ff-4341-8448-dee14d98f591.png)
Orders:
![image](https://user-images.githubusercontent.com/72870423/186676170-f2fd7798-120b-4ae3-bb87-ce86d8f0bfa4.png)
