import React from "react";
import {useStore} from "@src/store";
import '../styles.css'

const Card = () => {
    const { pokeData, setPokeDex} = useStore()
    return (
        <>
            {
                    pokeData.map((item: any) => {
                        return (
                            <>
                                <div className="card" key={item.id} onClick={()=>setPokeDex(item)}>
                                    <h2>{item.id}</h2>
                                    <img src={item.sprites.front_default} alt="" />
                                    <h2>{item.name}</h2>
                                </div>
                            </>
                        )
                    })
            }

        </>
    )
}
export default Card;