# Real Time Communication
Example:-Chap App , Real Time Dashboard , Trading platform 

*technology of RTC*
1. Long Polling

|--------------------------| 
|                          |
| |``````| ----->|``````|  |
| |Client| ----->|Server|  |
| |______|<----- |______|  |
|                          |
|--------------------------|
           |
           |
 client puch ta hai server sa
 kya mare liya koi update
 hai lagatar ager koi update 
 ata hai to server bata deta hai 
 client ko 

*prose*
1. REST Implementation
2. its Work Every Where
 
*Cons*
1. High Latency
2. Wastage

2. Server Sent Event

|--------------------------| 
|                          |
| |``````|----->|``````|   |
| |Client|<-----|Server|   |
| |______|<-----|______|   |
|                          |
|--------------------------|
           |
           |
 Client ek baar connection banata hai 
 fir server jit na event hai utna event 
 bhaja ta raha ta hai server latar replay
 update client bhi bich bich ma puch ta hai 
 server sa are you listening (Server sent event)

``LinghWeight hota ha``
``ya Bhi Proxies par kam kar ta hai``

3. Web Scokets

|--------------------------| 
|                          |
| |``````|----->|``````|   |
| |Client|<-----|Server|   |
| |______|----->|______|   |
|                          |
|--------------------------|
           |
           |
 channel open ki raha ta hai 
 ab jitni bhi bar client bhaj da 
 ya server bhaje channel open hi raha ta hai  

``Bi-Directional``
``Scalable With Borkers`` <---Kafka,Redis
``Proxies``



