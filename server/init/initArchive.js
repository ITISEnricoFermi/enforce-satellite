const debug = require("debug")("init")

const DATABASE = require("enforce-mysql")

const STORAGE = require("../mock/storage")

const ARCHIVER = require("../lib/archiver")

const defaults = {
	backupActive: false,
	databaseActive: true
}

const init = ({storage}) => {
	let storageMethod = null

	if ("backup" in storage && isBackupActive(storage)) {
		storageMethod = useBackup(storage)
	}
	if ("database" in storage && isDatabaseActive(storage)) {
		storageMethod = useDatabase(storage)
	}

	debug("Init archiver")
	const archiver = new ARCHIVER(storageMethod)

	return archiver
}

// utility functions
function isBackupActive({backup}) {
	if ("active" in backup) {
		return backup.active
	} else {
		return defaults.backupActive
	}
}

function isDatabaseActive({database}) {
	if ("active" in database) {
		return database.active
	} else {
		return defaults.databaseActive
	}
}

// USE functions
function useBackup({backup}) {
	debug("Init storage")
	return new STORAGE(backup)
}

function useDatabase({database}) {
	debug("Init database")
	return new DATABASE(database)
}

module.exports = {
	init
}
