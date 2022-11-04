from tracemalloc import start
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
algorithm = "bfs"

def checkDirection(prev, curr):
    print(prev,curr)
    if prev[0] > curr[0]:
        return "up"
    elif prev[0] < curr[0]:
        return "down"
    elif prev[1] > curr[1]:
        return "left"
    elif prev[1] < curr[1]:
        return "right"
    else:
        return "empty"

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Path Finding Visualizer"}


def getPathDFS(grid, numRows, numCols, startPos, endPos):
    e1 = endPos['i']
    e2 = endPos['j']
    dRow = [0, 1, 0, -1]
    dCol = [-1, 0, 1, 0]
    vis = [[False for i in range(len(grid[0]))] for j in range(len(grid))]
    
    def isValid(row, col, vis):
        if (row < 0 or col < 0 or row >= numRows or col >= numCols):
            return False
    
        print(numRows, numCols)
        print(row, col)
        print("----")
        if (vis[row][col]):
            return False
        if (grid[row][col]=='b'):
            return False

        return True
    
    st = []
    path=[]
    visitedpath=[]
    st.append([startPos['i'], startPos['j'], 0])
    var=1
    while st:
        # Pop the top pair
        curr = st.pop(-1)
        row,col,index = curr
    
        if not isValid(row, col, vis):
            continue
        print(grid[row][col])
        print(index)
        print("============")
        visitedpath.append([row, col,index+1])

        vis[row][col] = True
        if (grid[row][col]=='d'):
            print(grid[row][col])
            break
        #print(grid[row][col], end = " ")
        for i in range(4):
            adjx = row + dRow[i]
            adjy = col + dCol[i]
            if isValid(adjx, adjy, vis):
                st.append([adjx, adjy,index+1])
        var+=1
    #visitedpath.reverse()
    search=visitedpath[-1][2]
    print("\\\\\\\\\\\\\\\\")
    print (search)
    for i in range(len(visitedpath)-1,-1,-1):
        instance=visitedpath[i]
        #print(instance[2])
        if(instance[2]==search):
            path.insert(0,instance)
            search=search-1
    #path.reverse()
    filtered_path = []
    for p in path:
        filtered_path.append(tuple(p[0:-1]))
    print(filtered_path)
    print("----")
    #print(visitedpath)
    filtered_visitedpath = []
    for v in visitedpath:
        filtered_visitedpath.append(tuple(v[0:-1]))
    print(filtered_visitedpath)
    #print(st)
    
    directionPath = []
    for i in range(len(filtered_visitedpath) - 1):
        prev, curr = filtered_visitedpath[i],filtered_visitedpath[i+1]
        directionPath.append(checkDirection(prev, curr))
        
        directionPath.append(checkDirection(filtered_visitedpath[-1], (e1,e2)))
    return filtered_path[1:-1], filtered_visitedpath, directionPath
    #print(st)

def getShortestPathBFS(grid, numRows, numCols, startPos, endPos):
    DIR = [0, 1, 0, -1, 0]
    
    s1 = startPos['i']
    s2 = startPos['j']
    startPos = (startPos['i'],startPos['j'])    
    e1 = endPos['i']
    e2 = endPos['j']
    endPos = (endPos['i'],endPos['j'])

    q = deque([(s1, s2)])
    visited = set()
    visitedList = []
    backtrack = {}

    stop = False
    while q and not stop:
        for _ in range(len(q)):
            r,c  = q.popleft()  
            visited.add((r,c))
            #print((r,c))
            #visited[(r,c)] = True
            for i in range(4):
                nr, nc = r + DIR[i], c+DIR[i + 1]
                visitedList.append((nr,nc))
                
                
                if nr >= 0 and nr < numRows and nc >= 0 and nc < numCols and grid[nr][nc] != 'b'  and ((nr,nc)) not in visited:
                    q.append((nr, nc))
                    visited.add((nr,nc))
                    backtrack[(nr,nc)] = (r,c) 
                    if grid[nr][nc] == 'd':
                        stop = True
                        print(r,c)
                        print("-------------------")
                        break
            if stop:
                break

    #print(backtrack)   
        
    shortest_path = []
    if endPos in backtrack.keys():
        while backtrack[endPos] != startPos:
            #print(endPos, backtrack[endPos])
            endPos = backtrack[endPos]
            shortest_path.append(endPos)
        shortest_path = shortest_path[::-1]
        directionPath = []
        
        for i in range(len(shortest_path) - 1):
            directionPath.append(checkDirection(shortest_path[i], shortest_path[i+1]))
        
        directionPath.append(checkDirection(shortest_path[-1], (e1,e2)))
        return shortest_path, visitedList, directionPath
    
    print("lol")
    return [], visitedList
            
    
    
@app.get("/getShortestPath")
async def getShortestPathApi():
    global algorithm
    if algorithm == "bfs":
        return getShortestPathBFS(grid, numRows, numCols, startPos, endPos)
    elif algorithm == "dfs":
        return getPathDFS(grid, numRows, numCols, startPos, endPos)
        

class BaseParam(BaseModel):
    grid: List[list]
    numCols: int
    numRows: int
    startPos: dict
    endPos: dict
    algorithm: str

@app.post("/receiveInfo/", status_code=201)
async def receiveInfo(baseParam: BaseParam):
    res = baseParam
    print(res)

    global grid
    global numRows
    global numCols
    global startPos
    global endPos
    global algorithm
    
    print(res)    
    grid = res.grid
    numRows = res.numRows
    numCols = res.numCols
    startPos = res.startPos
    endPos = res.endPos
    algorithm = res.algorithm

    



