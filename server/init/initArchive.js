const DATABASE = require("enforce-mysql")

const STORAGE = require("../mock/storage")

const ARCHIVER = require("../lib/archiver")

const defaults = {
	backupActive: false,
	databaseActive: true
}

const init = (storageConfig) => {
	let storageMethod = null

	if ("backup" in storageConfig && isBackupActive(storageConfig)) {
		storageMethod = useBackup(storageConfig)
	}
	if ("database" in storageConfig && isDatabaseActive(storageConfig)) {
		storageMethod = useDatabase(storageConfig)
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
