import React from "react";
import {useStore} from "@src/store";
import PokeInfo from "@pages/Main/components/PokeInfo";
import Card from "@pages/Main/components/Card";
import './styles.css'


const Main = () => {
    const {prevUrl, setPokeData, setUrl, nextUrl} = useStore()
    return (
        <>
            <div className="container">
                <div className="left-content">
                    <Card />
                    <div className="btn-group">
                        {  prevUrl && <button onClick={()=>{
                            setPokeData([])
                            setUrl(prevUrl)
                        }}>Previous</button>}

                        { nextUrl && <button onClick={()=>{
                            setPokeData([])
                            setUrl(nextUrl)
                        }}>Next</button>}

                    </div>
                </div>
                <div className="right-content">
                    <PokeInfo />
                </div>
            </div>
        </>
    );
};

export default Main;