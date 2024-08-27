"use client"

 
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog"


import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function App() {

  const [matrice, setMatrice] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ])

  const [playerOne, setplayerOne] = useState(true)
  const [hasWinner, setHaswinner] = useState(false)



  const handleUpdateMatrice = (i, j , value) =>{
    let new_matrice = matrice.map(row => [...row]);
    if (new_matrice[i][j] === 0) {
      new_matrice[i][j] = value;
      setMatrice(new_matrice);
      if (isWinner(new_matrice)){
        setHaswinner(true)
        setOpen(true)
      } else {
        setplayerOne(!playerOne)
      }
    }
  }

  useEffect(() => {

    
  }, [matrice]);

  const resetGame = () =>{
    setMatrice([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0] 
    ])
    setplayerOne(true)
    setHaswinner(false)
  }
  
  const isWinner = (matrice)=>{
    console.log("matrice vw", matrice)
    for (let i = 0; i < matrice.length; i++) {
      const row = matrice[i]
      let sum = 0
      row.map(e => sum += e)
      if (sum === 3 || sum === -3){
          return true
      }
    }
    const sum_matrice_diagonal = matrice[0][0] + matrice[1][1] + matrice[2][2] 
    const sum_matrice_diagonal_secondaire = matrice[0][2] + matrice[1][1] + matrice[2][0] 
    if(sum_matrice_diagonal===3 || sum_matrice_diagonal===-3 || sum_matrice_diagonal_secondaire === 3 || sum_matrice_diagonal_secondaire === -3){
        return true
    }
    const matrice_vertical_1 = matrice[0][0] + matrice[1][0] + matrice[2][0]
    const matrice_vertical_2 = matrice[0][1] + matrice[1][1] + matrice[2][1]
    const matrice_vertical_3 = matrice[0][2] + matrice[1][2] + matrice[2][2]
    if (matrice_vertical_1 === 3 || matrice_vertical_2 === 3 || matrice_vertical_3 === 3 || matrice_vertical_1 === -3 || matrice_vertical_2 === -3 || matrice_vertical_3 === -3){
      return true
    }
  }

  const [open, setOpen] = useState(false)

  


  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 md:p-24">
          <h3 className="text-lg font-bold text-center">BIENVENU AU TICTACTOE</h3>
          <div>
            <div className="grid grid-cols-3  border-slate-600 rounded">
                {
                  matrice.map((cell, i)=>{
                    return (
                      <div key={`cell-${i}`}>
                      {
                        cell.map((col, j)=>{
                          return(
                            <button disabled={hasWinner} key={`col-${j}`} className="h-[80px] w-[80px] border flex justify-center items-center hover:bg-muted [&_p]:hover:flex" title="cell"
                            onClick={()=>handleUpdateMatrice(i, j, playerOne ? 1 : -1)}
                            >
                            { col === 0 && (
                                  <p className="text-muted-foreground opacity-30 hidden hover:flex  text-2xl font-bold">
                                    {playerOne ? 'X' : '0'}
                                  </p>)}
                                <p className="text-2xl font-bold">
                                 {col === 0 ? "" : col === 1 ? <span className="text-xl text-blue-400">X</span> : <span className="text-xl text-green-400">0</span>}
                                </p>
                            </button>
                          )
                        })
                      }
                      </div>
                    )
                  })
                }
            </div>
        </div>
        {
          hasWinner ? <Button onClick={resetGame}>Rejouer</Button> :
        <div>
          {
            playerOne ? <span className="text-sm font-bold">C&apos;est Au tour du joueur{" "}<span className="text-xl text-blue-400">X</span></span> : <span className="text-sm font-bold">C&apos;est Au tour du jouer{" "} <span className="text-xl text-green-400">0</span></span>
          }
        </div>
        }
      <WinnerDialog open={open} setOpen={setOpen} winner={playerOne ? "X" : "0"}/>
    </main>
  );
}

// fill matrice

const WinnerDialog = ({open, setOpen, winner}) =>{
  return (
    <Dialog open={open} onOpenChange={()=>setOpen(!open)}>
    <DialogContent className="sm:max-w-md">
    <DialogHeader>
          <DialogTitle>Felicatation</DialogTitle>
        </DialogHeader>
        <div className="py-4">
            Le Jouer {winner} a remporter la partie
          </div >
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button">
              Ok
            </Button>
          </DialogClose>
        </DialogFooter>

    </DialogContent>
  </Dialog>
  )
}