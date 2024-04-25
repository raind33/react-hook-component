function bfs(node) {
  if(node === null) return node

  let queue = [node]
  let result = []
  let set = new Set()
  
  set.add(node)

  while(queue.length) {
    const cur = queue.shift()
    result.push(cur)
    
    for(let child of cur.nexts) {
      if(!set.has(child)) {
        queue.push(child)
      }
    }
  }
  return result

}
function dfs(node) {
  if(node === null) return node 
  let stack = [node]
  let result = []
  let set = new Set()

  while(stack.length) {
    let cur = stack.pop()
    result.push(cur)
    for(let child of cur.nexts) {
      if(!set.has(child)) {
        stack.push(cur)
        stack.push(child)
      }
    }
  }

}