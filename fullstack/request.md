/*
what is streams
A stream is a way to handle data piece by piece (chunk by chunk) instead of loading everything into memory at once.
*/

/*
What is a Duplex Stream?
A Duplex stream is a stream that can:Read data AND write data at the same time

example:Imagine a phone call
       |->You listen → readable
       |->You speak → writable

Duplex Streams in Node.js
In Node.js, Duplex streams inherit from both:
Readable
Writable
👉 But here’s the key detail most people miss: The read side and write side are independent


Application           Duplex Stream     Socket 
        |---->Read   |Read Buffer  |<--------|
        |<----Write  |Write Buffer |-------->|
*/

/*
What is Chunks
A chunk is a small piece of data that flows through a stream.
👉 Instead of handling all data at once:

Streams break it into chunks
Process each chunk one by one

|I|                         |O|
|N|->CHUNK| NODE.js |<-CHUNK|U|
|P|->CHUNK| Program |<-CHUNK|T|
|U|->CHINK|         |<-CHINK|P|
|T|                         |U|
                            |T|


reading            Processing
     |             |
   Chunk1          |         
   |     |--------->
   |         Puch  Chunk1
    Chunk2                    
   |     |--------->
   |         Puch  Chunk2
    Chunk3                    
         |--------->
             Puch  Chunk3
*/

