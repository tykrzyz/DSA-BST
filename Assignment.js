class BinarySearchTree{
  constructor(key = null, value = null, parent = null){
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
  insert(key, value) {
    if (this.key == null) {
      this.key = key;
      this.value = value;
    }

    else if (key < this.key) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      else {
        this.left.insert(key, value);
      }
    }
    else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }
    
  find(key) {
    if (this.key == key) {
      return this.value;
    }
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    // You have searched the tree and the item is not in the tree
    else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      /* If the node only has a left child, 
           then you replace the node with its left child */
      else if (this.left) {
        this._replaceWith(this.left);
      }
      /* And similarly if the node only has a right child 
           then you replace it with its right child */
      else if (this.right) {
        this._replaceWith(this.right);
      }
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }
  
  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      }
      else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  _findMax() {
    if (!this.right) {
      return this;
    }
    return this.right._findMax();
  }

  
}

function main(){
  const BST = new BinarySearchTree();
  let arr = [3,1,4,6,9,2,5,7];
  let balanced = [5,3,7,1,6,4,9];
  let arr2 = ['E','A','S','Y','Q','U','E','S','T','I','O','N'];
  for(let x = 0; x< balanced.length; x++)
    BST.insert(balanced[x], balanced[x]);
  console.log(isBinarySearch(BST));
  console.log(isBalancedTree(BST));
  console.dir(BST);
  
}

function areTheSameBST(arr1, arr2, start1 = 0, start2 = 0,){
  if(arr1[start1] !== arr2[start2]){
    console.log(arr2[start2])
    return false;
  }
  let SameBST = true;
  if(!arr1[start1+1]){
    return true;
  }
  if(arr1[start1+1] < arr1[start1]){
    const index = arr2.slice(start2).findIndex(value => value < arr2[start2]);
    if(index === -1){
      return false;
    }
    SameBST = areTheSameBST(arr1, arr2, start1+1, index);
  }
  if(arr1[start1+1] > arr1[start1]){
    const index = arr2.slice(start2).findIndex(value => value > arr2[start2]);
    if(!index === -1){
      return false;
    }
    SameBST = areTheSameBST(arr1, arr2, start1+1, index);
  }

  return SameBST;
}

function height(tree, result = 0){
  if(tree == null){
    return result;
  } 
  result++;
  const leftHeight = height(tree.left, result);
  const rightHeight = height(tree.right, result);
 
  return leftHeight > rightHeight ? leftHeight : rightHeight;
}

function isBinarySearch(tree){
  let isLeft=true;
  let isRight=true;
  if(tree.left){
    if(tree.left.key > tree.key){
      return false;
    }
    isLeft = isBinarySearch(tree.left);
  }
  if(tree.right){
    if(tree.right.key < tree.key){
      return false;
    }
    isRight = isBinarySearch(tree.right);
  }
  return isLeft&&isRight;

}

function thirdLargest(tree){
  const largest = tree._findMax().value;
  tree.remove(largest);
  const secondLargest = tree._findMax().value;
  tree.remove(secondLargest);
  const thirdLargest = tree._findMax().value;
  tree.insert(secondLargest, secondLargest);
  tree.insert(largest, largest);
  return thirdLargest;

}

function isBalancedTree(tree){
  if(height(tree) === 0){
    return true;
  }
  if(Math.abs(height(tree.left) - height(tree.right)) > 1)
    return false;
  return isBalancedTree(tree.left) && isBalancedTree(tree.right);
}

main();




/*
  1)           3
            1    4
              2    6
                 5   9
                   7

               E
          A          S
            E     Q      Y
                 I  U   T
                  O   S
                 N
                   
                   

  2)           2
            1    4
                  6
                 5   9
                   7

               E
          A          S
                 Q      Y
                 I  U   T
                  O   S
                 N
                   
                   
  4) It adds together all items in the tree
*/