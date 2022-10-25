from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from collections import deque

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


res = {}
grid = []
numRows = -1
numCols = -1
startPos = {}
endPos = {}


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Path Finding Visualizer"}


class BaseParam(BaseModel):
    grid: List[list]
    numCols: int
    numRows: int
    startPos: dict
    endPos: dict
    
    
def getShortestPath(grid, numRows, numCols, startPos, endPos):
    DIR = [0, 1, 0, -1, 0]
    
    s1 = startPos['i']
    s2 = startPos['j']
    startPos = (startPos['i'],startPos['j'])    
    e1 = endPos['i']
    e2 = endPos['j']
    endPos = (endPos['i'],endPos['j'])

    q = deque([(s1, s2)])
    visited = set()
    backtrack = {}
    
    while q:
        r,c  = q.popleft()  
        visited.add((r,c))
        print((r,c))
        #visited[(r,c)] = True
        if grid[r][c] == 'd':
            print(r,c)
            print("-------------------")
            break
            
        for i in range(4):
            nr, nc = r + DIR[i], c+DIR[i + 1]
            if nr >= 0 and nr < numRows and nc >= 0 and nc < numCols and (grid[nr][nc] == 'e' or grid[nr][nc] == 'd')  and ((nr,nc)) not in visited:
                q.append((nr, nc))
                visited.add((nr,nc))
                backtrack[(nr,nc)] = (r,c) 

    #print(backtrack)   

    shortest_path = []
    while backtrack[endPos] != startPos:
        print(endPos, backtrack[endPos])
        endPos = backtrack[endPos]
        shortest_path.append(endPos)

    print(shortest_path[::-1])
    return shortest_path[::-1], list(visited)
            
    
    
@app.get("/getShortestPath")
async def getShortestPathApi():
    return getShortestPath(grid, numRows, numCols, startPos, endPos)

    
@app.post("/receiveInfo/", status_code=201)
async def receiveInfo(baseParam: BaseParam):
    res = baseParam

    global grid
    global numRows
    global numCols
    global startPos
    global endPos
    
    
    grid = res.grid
    numRows = res.numRows
    numCols = res.numCols
    startPos = res.startPos
    endPos = res.endPos
    print(res)    

    



