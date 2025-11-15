import React, { useState } from "react"
 export default function Account(Account_Status){
   const PRO = ()=>{
            const setDataBase =  0;
            const setDataBaseColor = "progress-bar bg-success"
            const setBidLeft = 0
            const setAccType ="Pro" 
            const setAccTypeColor = "progress-bar bg-success"
return(
                        <div>
                                        <div class="card-div">
                                        <h4 class="small font-weight-bold">Customer Database<span class="float-right">{setDataBase}% Used</span></h4>
                                        <div class="progress progress-sm mb-3">
                                            <div class={setDataBaseColor} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: `${setDataBase}%`}}><span class="sr-only">{setBidLeft}%</span></div>
                                        </div>
                                        <h4 class="small font-weight-bold">{setAccType} Account setup<span class="float-right">Complete!</span></h4>
                                        <div class="progress progress-sm mb-3">
                                            <div className={setAccTypeColor} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"style={{width: `${setBidLeft}%`}}><span class="sr-only">{setBidLeft}%</span></div>
                                        </div>
                                    </div>
                    </div>
                    )
   }
   const PREMIUM = ()=>{
    const setDataBase =  0;
    const setDataBaseColor = "progress-bar bg-success"
    const setBidLeft = 0
    const setAccType ="Pro" 
    const setAccTypeColor = "progress-bar bg-success"
return(
                <div>
                                <div class="card-div">
                                <h4 class="small font-weight-bold">Customer Database<span class="float-right">{setDataBase}% Used</span></h4>
                                <div class="progress progress-sm mb-3">
                                    <div class={setDataBaseColor} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: `${setDataBase}%`}}><span class="sr-only">{setBidLeft}%</span></div>
                                </div>
                                <h4 class="small font-weight-bold">{setAccType} Account setup<span class="float-right">Complete!</span></h4>
                                <div class="progress progress-sm mb-3">
                                    <div className={setAccTypeColor} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"style={{width: `${setBidLeft}%`}}><span class="sr-only">{setBidLeft}%</span></div>
                                </div>
                            </div>
            </div>
            )
}
        switch(Account_Status){
                case '501':
                    return PRO();
                case '601':
                    return PREMIUM();
        }



       }           