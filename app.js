const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')
//Adding note
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            desc: 'Title of the note',
            demandOption: true,
            type: 'string'
        },
        body: {
            desc: 'Contents of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//Removing note
yargs.command({
    command: 'remove',
    describe: 'Remove the note',
    builder: {
        title: {
            desc: 'Title of note to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

//Listing note
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler() {
        notes.listNotes()
    }

})

//Reading note
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            desc: 'Title of note to read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse()