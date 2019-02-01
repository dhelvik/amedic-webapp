CREATE TABLE AMEDUser(
	ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255),
	password VARCHAR(255),
	role VARCHAR(255),
	lastLogin timestamp
);

CREATE TABLE Treatment(
	ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	description VARCHAR(255),
	treatmentScheme VARCHAR(255),
	drug VARCHAR(255),
	drugAdministration VARCHAR(255)
);

CREATE TABLE Diagnosis(
	ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255), 
	description VARCHAR(255),
	`class` VARCHAR(255)
);

CREATE TABLE Treatment_Diagnosis(
	treatmentID INT,
	diagnosisID INT,
	CONSTRAINT Treatment_Diagnosis_PK PRIMARY KEY (treatmentID, diagnosisID),
	CONSTRAINT  TreatmentID_FK FOREIGN KEY (treatmentID) REFERENCES Treatment(ID),
	CONSTRAINT DiagnosisID_FK FOREIGN KEY (diagnosisID) REFERENCES Diagnosis(ID)
);

CREATE TABLE District(
	name VARCHAR(255) PRIMARY KEY
);

CREATE TABLE Village(
	name VARCHAR(255) PRIMARY KEY,
	districtName VARCHAR(255),
	CONSTRAINT District_Name_FK FOREIGN KEY (districtName) REFERENCES District(name)
);

CREATE TABLE HealthFacility(
	name VARCHAR(255) PRIMARY KEY,
	villageName VARCHAR(255),
	CONSTRAINT Villager_Name_FK FOREIGN KEY (villageName) REFERENCES Village(name)
);

CREATE TABLE Patient(
	ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255),
	nationalID INT UNIQUE,
	mobileNo INT,
	sex VARCHAR(10),
	villageName VARCHAR(255),
	dateOfBirth DATE,
	CONSTRAINT Village_Name_FK FOREIGN KEY (villageName) REFERENCES Village(name)
);

CREATE TABLE CareGiver(
	ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255),
	nationalID INT UNIQUE,
	relationToPatient VARCHAR(255)
);

CREATE TABLE CareGiver_Patient(
	patientID INT,
	careGiverID INT,
	CONSTRAINT CareGiver_Patient_PK PRIMARY KEY (patientID, careGiverID),
	CONSTRAINT PatientID_FK FOREIGN KEY (patientID) REFERENCES Patient(ID),
	CONSTRAINT CareGiverID_FK FOREIGN KEY (careGiverID) REFERENCES CareGiver(ID)
);

CREATE TABLE HSA(
	ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255),
	loginID VARCHAR(255) UNIQUE,
	password VARCHAR(255), 
	mobileNo VARCHAR(255),
	email VARCHAR(255),
	facility VARCHAR(255),
	lastLogin timestamp,
	CONSTRAINT Facility_FK FOREIGN KEY (facility) REFERENCES HealthFacility(name)
);

CREATE TABLE HealthExpert(
	ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	loginID VARCHAR(255) UNIQUE,
	password VARCHAR(255), 
	lastLogin timestamp,
	facility VARCHAR(255),
	CONSTRAINT Facility_FK FOREIGN KEY (facility) REFERENCES HealthFacility(name)
)

CREATE TABLE HE_visit(
	patientID INT,
	diagnosisID INT,
	expertID INT,
	`timestamp` timestamp,
	CONSTRAINT HE_Visit_PK PRIMARY KEY (patientID, diagnosisID, expertID),
	CONSTRAINT Patient_FK FOREIGN KEY (patientID) REFERENCES Patient(ID),
	CONSTRAINT Diagnosis_FK FOREIGN KEY (diagnosisID) REFERENCES Diagnosis(ID),
	CONSTRAINT Health_Expert_FK FOREIGN KEY (expertID) REFERENCES HealthExpert(ID)
);

CREATE TABLE SymptomsSheet(
	ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	description VARCHAR(255),
	cough BOOLEAN,
	coughDays INT,
	diarrhoea BOOLEAN,
	diarrhoeaDays INT,
	bloodInStool VARCHAR(255),
	fever INT,
	feverDays INT,
	convulsions VARCHAR(255),
	difficultToEatDrink BOOLEAN,
	cannotEatDrink BOOLEAN,
	vomiting BOOLEAN,
	vomitsEverything BOOLEAN,
	redEyes BOOLEAN,
	redEyesDays INT,
	difficultiesToSee BOOLEAN,
	difficultiesToSeeDays INT,
	chestIndraw VARCHAR(255),
	breathingFreq INT,
	sleepy VARCHAR(255),
	unconscious VARCHAR(255),
	palmarPalor VARCHAR(255),
	muac VARCHAR(255),
	swollenFeet VARCHAR(255)
);

CREATE TABLE HSA_visit(
	patientID INT,
	diagnosisID INT,
	HSAID INT,
	symptomID INT,
	`timestamp` timestamp,
	CONSTRAINT HSA_Visit_PK PRIMARY KEY (patientID, diagnosisID, HSAID, symptomID),
	CONSTRAINT Patient_FK FOREIGN KEY (patientID) REFERENCES Patient(ID),
	CONSTRAINT Diagnosis_FK FOREIGN KEY (diagnosisID) REFERENCES Diagnosis(ID),
	CONSTRAINT SymptomsSheet_FK FOREIGN KEY (HSAID) REFERENCES HSA(ID),
	CONSTRAINT HSA_FK FOREIGN KEY (expertID) REFERENCES SymptomsSheet(ID)
);