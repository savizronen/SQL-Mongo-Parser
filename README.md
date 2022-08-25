# SQL-Mongi-Parser
Converts SQL Queries to JSON.

![image](https://user-images.githubusercontent.com/72870423/186673927-dd775a39-ffaf-48df-af1f-a3af119d03b3.png)

Queries SQL examples:
select * from custumers

![image](https://user-images.githubusercontent.com/72870423/186674095-d10e8f41-c67d-472f-bd20-bf4ce3ded45f.png)

select * from custumers where city in ("rehovot,modiin)

![image](https://user-images.githubusercontent.com/72870423/186674996-b085d8f3-847d-4d37-b74e-b3f764de8ea1.png)

select * from customers as customer join orders as orders on customer.cid = orders.cid

![image](https://user-images.githubusercontent.com/72870423/186675693-f4842dd5-8179-4a88-997e-c2e036a27719.png)

MongoDb Database example:

![image](https://user-images.githubusercontent.com/72870423/186676676-26ceffa0-e1d3-457b-91d4-3f839885091c.png)
Customers:
![image](https://user-images.githubusercontent.com/72870423/186676098-e94a7b64-8f25-4408-aad5-2265549c0a8d.png)
OrderItems:
![image](https://user-images.githubusercontent.com/72870423/186676213-5206ab6a-d6ff-4341-8448-dee14d98f591.png)
Orders:
![image](https://user-images.githubusercontent.com/72870423/186676170-f2fd7798-120b-4ae3-bb87-ce86d8f0bfa4.png)
