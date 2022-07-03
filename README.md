# colors_solver
Reference implementation to solve the colors game from https://github.com/wengerp

# colors
A performant Colors Solver

# Data structure
Puzzles iin colors consists of 4 fields each having a color. Puzzles have several colors (from 1 to n). Our demo puzzle usea 6 colors:
- Yellow (1)
- Orange (2)
- Red (3)
- Green (4)
- Blue (5)
- Brown (6)

A single piece can therefore be modelled as a 4 digit number starting in the top left corner and running clockwise to the next fiel, i.E.

2411 is a piece with the following 3 field colors: 
- Orange (top left)
- Green (top right)
- Yellow (bottom right)
- Yellow (bottom left)

Since the pieces can be roteted the numbers must be shifted 4 timees for each piece
2411 becomes 4112, 1124, 1241 

The pieces can be stored id a simple structure containing the number an a flag for "original" and "rotated".

[0] first piece  
...  
[i] 2411 GUID i  
[i+1] 4112 GUID i  
[i+2] 1224 GUID i  
[i+3] 1241 GUID i  
...  
[n-1] last piece  

# Search
```
DFS(node, goal)  
{  
    if (node == goal)  
    {  
        return node;  
    }  
    else  
    {  
        stack := expand (node)  
        while (stack is not empty)  
        {  
            node' := pop(stack);  
            DFS(node', goal);  
        }  
    }  
}  
```
```
SOLS[]

DFS( CS, STACK ) {
    if ( STACK == empty ) {
        SOLS.push( CS )
        return SOLS
    }
    else { 
        STACK.push(findNextPiece(CS) )
        while ( STACK != empty ) {
            DFS( CS, STACK )
        }
    }
}
```
