const {
    default: chalk
} = require('chalk')
const fs = require('fs')
const yargs = require('yargs')

const addNote = (title, body) => {
    const notes = loadNotes()

    const dupli = notes.find(i => i.title == title)

    if (dupli) return console.log(chalk.redBright('Duplicate Title'))

    notes.push({
        title: title,
        body: body
    })

    saveNotes(notes)
    console.log(chalk.greenBright('Note Added'))
}

const removeNote = (title) => {
    const notes = loadNotes()
    const newNotes = notes.filter(i => i.title !== title)

    if (newNotes.length === notes.length) return console.log(chalk.redBright('No such note found'))

    saveNotes(newNotes)
    console.log(chalk.greenBright('Note Removed'))
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.yellowBright('List of notes'))
    notes.forEach((i) => {
        console.log(i.title);
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((i) => i.title === title)

    if (note) {
        console.log(chalk.cyanBright(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.redBright('No note found.'));
    }
}

function loadNotes() {
    try {
        const buffer = fs.readFileSync('notes.json')
        const dataJson = buffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }
}

function saveNotes(notes) {
    const jstring = JSON.stringify(notes)
    fs.writeFileSync('notes.json', jstring)
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}