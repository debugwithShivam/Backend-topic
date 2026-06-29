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
 fir server jitne event hai utna event 
 bhaja ta raha ta hai server latar replay
 update client bhi bich bich ma puch ta hai 
 server sa are you listening (Server sent event)

``LinghWeight hota ha``
``ya Bhi Proxies par kam kar ta hai``

*content-type: text/event-stream*
ye sabse important hai.
👉 normally server kya karta hai?
request aayi
response diya
connection close

👉 lekin yaha tum keh rahe ho:
“main ek stream bhejunga, ek baar me pura data nahi”
ye use hota hai Server-Sent Events (SSE) me

iska matlab:
server client ko continuously data bhej sakta hai
bina baar-baar request ke

jaise:
live notifications
live chat updates
stock price updates


```js
res.writeHead(200, {
    'content-type': 'text/event-stream',
    'cache-control': 'no-cache',
    'Connection': 'keep-alive'
})
```


*cache-control: no-cache*

👉 browser ko bol rahe ho:
“is data ko cache mat karna”

kyunki:
ye live data hai
agar cache ho gaya to purana data dikhega

*Connection: keep-alive*

👉 ye bolta hai:
“connection band mat karna”
normal HTTP me:
request → response → connection close

yaha:
request → connection open rahega → server baar-baar data bhejega

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
 channel open hi raha ta hai 
 jitni bhi bar client bhaj da 
 ya server bhaje channel open hi raha ta hai  

``Bi-Directional``
``Scalable With Borkers`` <---Kafka,Redis
``Proxies``



