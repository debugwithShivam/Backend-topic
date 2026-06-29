# precess or thread

# Process kya hota hai?

Process = ek independent running program

Example:

Tu Chrome open karta hai → ek process
VS Code open karta hai → dusra process

*Har process ka apna:

memory (RAM space)
variables
stack, heap
resources

*Matlab: completely isolated hota hai*


# Thread kya hota hai?

Thread = ek lightweight execution unit inside a process

Ek process ke andar multiple threads ho sakte hain.

Example:

Chrome process ke andar:
ek thread UI handle karega
ek thread network request karega
ek thread JS run karega

*Matlab: threads ek hi process ke andar kaam karte hain*

# Process lifecycle

# Process Lifecycle (Deep Notes)

## What is a Process?
A process is an instance of a running program with its own:
- Memory space (code, stack, heap)
- CPU state (registers, program counter)
- OS metadata (PCB)

---

## Process Lifecycle States

### 1. NEW (Creation)
- Process is being created
- OS allocates:
  - Memory
  - Process Control Block (PCB)
- Program code is loaded into RAM

---

### 2. READY
- Process is ready to execute
- Waiting in **Ready Queue**
- Has everything except CPU

**Key Point:**
CPU is limited → multiple processes compete

---

### 3. RUNNING
- Process is executing instructions on CPU
- Program Counter (PC) is actively moving
- CPU registers contain process state

**Important:**
At one moment, one CPU core runs one process

---

### 4. WAITING / BLOCKED
- Process is waiting for an event (usually I/O)
- Examples:
  - File read/write
  - Network request
  - User input
- CPU is released for other processes

**Why this exists:**
I/O is slow → CPU should not sit idle

---

### 5. TERMINATED
- Process execution finished or crashed
- OS:
  - Frees memory
  - Deletes PCB

---

## State Transition Flow

NEW → READY → RUNNING → TERMINATED  
       ↓  
      WAITING → READY  

---

## Process Control Block (PCB)

PCB is the OS data structure that represents a process.

### Contains:
- Process ID (PID)
- Program Counter (PC)
- CPU Registers
- Memory pointers
- Scheduling info (priority, state)

**Why PCB matters:**
OS manages processes using PCB, not directly

---

## Context Switching

### What is it?
Switching CPU from one process to another

### Steps:
1. Save current process state → PCB
2. Load next process state → CPU
3. Resume execution

---

### Critical Data Saved:
- Program Counter (PC)
- CPU Registers
- Stack Pointer

**Why important:**
Without this, process cannot resume correctly

---

## Why Context Switching Happens

1. **Time Slice Expired**
   - OS uses time-sharing (e.g., Round Robin)

2. **I/O Request**
   - Process moves to WAITING

3. **Interrupt / Higher Priority Process**
   - CPU reassigned

---

## Role of Interrupts

- I/O completion triggers interrupt
- CPU pauses current process
- OS moves waiting process → READY

---

## Key Insights (Important)

- Multitasking is an illusion created by fast context switching
- CPU is always busy if scheduling is efficient
- WAITING state prevents CPU waste
- PCB is essential for process management

---

## Common Misconceptions

❌ Processes always run continuously  
✔️ They are frequently paused and resumed  

❌ WAITING = idle  
✔️ WAITING = blocked for external event  

❌ Multitasking = multiple processes running simultaneously  
✔️ Actually rapid switching (on single core)

---

## Real Example Flow

1. User opens browser → NEW  
2. Browser enters READY queue  
3. Gets CPU → RUNNING  
4. Requests data → WAITING  
5. Data arrives → READY  
6. Executes again → RUNNING  
7. User closes → TERMINATED  

---

## Summary

- Process lifecycle = state transitions managed by OS
- CPU scheduling + context switching = core mechanism
- PCB = backbone of process tracking
- WAITING state = efficiency optimization