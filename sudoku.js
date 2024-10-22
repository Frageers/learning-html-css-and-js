window.onload = function() {
    createBoard();
};

function createBoard() {
    const table = document.getElementById('sudoku-board');
    for (let i = 0; i < 9; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('maxlength', '1'); // Only allow one digit input
            input.setAttribute('data-row', i);
            input.setAttribute('data-col', j);
            input.addEventListener('keydown', handleKeyNavigation);
            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

function handleKeyNavigation(e) {
    const row = parseInt(this.getAttribute('data-row'));
    const col = parseInt(this.getAttribute('data-col'));

    switch (e.key) {
        case 'ArrowUp':
            moveFocus(row - 1, col);
            break;
        case 'ArrowDown':
            moveFocus(row + 1, col);
            break;
        case 'ArrowLeft':
            moveFocus(row, col - 1);
            break;
        case 'ArrowRight':
            moveFocus(row, col + 1);
            break;
    }
}

function moveFocus(row, col) {
    if (row >= 0 && row < 9 && col >= 0 && col < 9) {
        const nextInput = document.querySelector(`input[data-row='${row}'][data-col='${col}']`);
        if (nextInput) {
            nextInput.focus();
        }
    }
}

document.getElementById('solve-btn').addEventListener('click', function() {
    const inputs = document.querySelectorAll('input');
    const newBoard = [];

    // Retrieve values from input fields into a 9x9 array
    for (let i = 0; i < 9; i++) {
        newBoard[i] = [];
        for (let j = 0; j < 9; j++) {
            const value = inputs[i * 9 + j].value;
            newBoard[i][j] = value === '' ? 0 : parseInt(value);
        }
    }

    // Solve the Sudoku board
    if (solve(newBoard)) {
        updateBoard(newBoard);
    } else {
        alert('No solution exists!');
    }
});

function updateBoard(board) {
    const inputs = document.querySelectorAll('input');
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            inputs[i * 9 + j].value = board[i][j];
        }
    }
}

// Sudoku solver functions

function solve(board) {
    const find = findEmpty(board);
    if (!find) return true;
    const [row, col] = find;

    for (let i = 1; i <= 9; i++) {
        if (isValid(board, i, [row, col])) {
            board[row][col] = i;

            if (solve(board)) return true;

            board[row][col] = 0;
        }
    }
    return false;
}

function isValid(board, num, pos) {
    // Check row
    for (let i = 0; i < board[0].length; i++) {
        if (board[pos[0]][i] === num && pos[1] !== i) return false;
    }

    // Check column
    for (let i = 0; i < board.length; i++) {
        if (board[i][pos[1]] === num && pos[0] !== i) return false;
    }

    // Check box
    const boxRow = Math.floor(pos[0] / 3) * 3;
    const boxCol = Math.floor(pos[1] / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
        for (let j = boxCol; j < boxCol + 3; j++) {
            if (board[i][j] === num && (i !== pos[0] || j !== pos[1])) return false;
        }
    }

    return true;
}

function findEmpty(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) return [i, j];
        }
    }
    return null;
}
