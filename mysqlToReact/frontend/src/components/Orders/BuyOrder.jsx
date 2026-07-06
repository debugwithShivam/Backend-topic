import React from 'react'



function InputFields({lable,props}){
  return (
    <div className="">
      <label htmlFor={lable}>{lable}</label>
      <input {...props}  id={lable} />
    </div>
  )
}

function Information(){
  
}

function Payment(){

}

function CompleteOrder(){

}

export default function BuyOrder() {
  return (
    <div className='mt-16 p-5 h-30'>
      <div className="w-full p-3 gap-5 h-full rounded-lg bg-[radial-gradient(circle,_rgba(218,222,245,1)0%,_rgba(212,205,207,1)100%)] flex">
        <div className="w-full rounded-lg bg-white">
          <div className="">
            <div className="">
              <h1>Checkout</h1>
            </div>
            <div className="">

            </div>
          </div>
          <div className=""></div>
          <div className=""></div>
        </div>
        <div className="w-full rounded-lg bg-[radial-gradient(circle,_rgba(30,38,99,1)0%,_rgba(1,4,92,1)100%)]"></div>
      </div>
    </div>
  )
}
