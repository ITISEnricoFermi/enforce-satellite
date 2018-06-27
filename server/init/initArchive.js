const DATABASE = require("enforce-mysql")

const STORAGE = require("../mock/storage")

const ARCHIVER = require("../lib/archiver")

const defaults = {
	backupActive: false,
	databaseActive: true
}

const init = (config) => {
	let storageMethod = null

	if ("backup" in config && isBackupActive(config)) {
		storageMethod = useBackup(config)
	}
	if ("database" in config && isDatabaseActive(config)) {
		storageMethod = useDatabase(config)
	}

	const archiver = new ARCHIVER(storageMethod)

	return archiver
}

// utility functions
function isBackupActive({
	backup
}) {
	if ("active" in backup) {
		return backup.active
	} else {
		return defaults.backupActive
	}
}

function isDatabaseActive({
	database
}) {
	if ("active" in database) {
		return database.active
	} else {
		return defaults.databaseActive
	}
}

// USE functions
function useBackup({
	backup
}) {
	return new STORAGE(backup)
}

function useDatabase({
	database
}) {
	return new DATABASE(database)
}

module.exports = {
	init
}
