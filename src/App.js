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


import {  useEffect, useState } from "react";
import { cn } from "./lib/utils";

export default function App() {

  const [matrice, setMatrice] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ])
  const [plaerWins, setPlayerWins] = useState({
    'X': 0,
    'O': 0
  })

  const [playerOne, setplayerOne] = useState(true)
  const [gameEnd, setGameEnd] = useState(false)



  const handleUpdateMatrice = (i, j , value) =>{
    let new_matrice = matrice.map(row => [...row]);
    if (new_matrice[i][j] === 0) {
      new_matrice[i][j] = value;
      setMatrice(new_matrice);
      if (hasWinner(new_matrice)){
        const player = playerOne ? 'X' : 'O'
        setPlayerWins({ ...plaerWins, [player]: plaerWins[player] + 1 })
        setGameEnd(true)
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
    setGameEnd(false)
  }
  
  const hasWinner = (matrice)=>{
    console.log("matrice vw", matrice)
    let have_empty = false
    for (let i = 0; i < matrice.length; i++) {
      const row = matrice[i]
      if (row.includes(0)){ have_empty = true}
      let sum = 0
      row.map(e => sum += e)
      if (sum === 3 || sum === -3){
          return true
      }
    }
    if (have_empty === false) {
      setGameEnd(true)
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
      <div className="flex gap-2 items-center">
        <span>{plaerWins.X}</span>
        &bull;
      <span className="text-xl font-bold text-blue-400">X</span>
      <div className="mx-5">VS</div>
      <span className="text-xl font-bold text-green-400">0</span>
      &bull;
      <span>{plaerWins.O}</span>

      </div>
          <h3 className="text-lg font-bold text-center">TICTACTOE</h3>
          <div>
            <div className="grid grid-cols-3 border rounded-xl overflow-hidden" style={{borderRadius: 3}}>
                {
                  matrice.map((cell, i)=>{
                    return (
                      <div key={`cell-${i}`}>
                      {
                        cell.map((col, j)=>{
                          return(
                            <button disabled={gameEnd} key={`col-${j}`} className={cn("h-[80px] w-[80px] border flex justify-center items-center hover:bg-muted [&_p]:hover:flex", col === 0 ? "" : col === 1 ? "border-blue-900" : "border-green-900")} title="cell"
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
          gameEnd ? <Button onClick={resetGame}>Rejouer</Button> :
        <div>
          {
            playerOne ? <span className="text-sm font-bold">C&apos;est au tour du joueur{" "}<span className="text-xl text-blue-400">X</span></span> : <span className="text-sm font-bold">C&apos;est au tour du jouer{" "} <span className="text-xl text-green-400">0</span></span>
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
          <DialogTitle>Congratulations 🎉</DialogTitle>
        </DialogHeader>
        <div className="py-4">
            Le Jouer <span className="font-bold text-xl">{winner}</span>  a remporte la partie
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