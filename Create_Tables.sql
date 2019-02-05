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
	treatmentID INT UNSIGNED,
	diagnosisID INT UNSIGNED,
	CONSTRAINT Treatment_Diagnosis_PK PRIMARY KEY (treatmentID, diagnosisID),
	CONSTRAINT  Treatment_Diagnosis_TreatmentID_FK FOREIGN KEY (treatmentID) REFERENCES Treatment(ID),
	CONSTRAINT Treatment_Diagnosis_DiagnosisID_FK FOREIGN KEY (diagnosisID) REFERENCES Diagnosis(ID)
);

CREATE TABLE District(
	name VARCHAR(255) PRIMARY KEY
);

CREATE TABLE Village(
	name VARCHAR(255) PRIMARY KEY,
	districtName VARCHAR(255),
	CONSTRAINT Village_District_Name_FK FOREIGN KEY (districtName) REFERENCES District(name)
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
	CONSTRAINT Patient_Village_Name_FK FOREIGN KEY (villageName) REFERENCES Village(name)
);

CREATE TABLE CareGiver(
	ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255),
	nationalID INT UNIQUE,
	relationToPatient VARCHAR(255)
);

CREATE TABLE CareGiver_Patient(
	patientID INT UNSIGNED,
	careGiverID INT UNSIGNED,
	CONSTRAINT CareGiver_Patient_PK PRIMARY KEY (patientID, careGiverID),
	CONSTRAINT CareGiver_Patient_PatientID_FK FOREIGN KEY (patientID) REFERENCES Patient(ID),
	CONSTRAINT CareGiver_Patient_CareGiverID_FK FOREIGN KEY (careGiverID) REFERENCES CareGiver(ID)
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
	CONSTRAINT HSA_Facility_FK FOREIGN KEY (facility) REFERENCES HealthFacility(name)
);

CREATE TABLE HealthExpert(
	ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	loginID VARCHAR(255) UNIQUE,
	password VARCHAR(255), 
	lastLogin timestamp,
	facility VARCHAR(255),
	CONSTRAINT HE_Facility_FK FOREIGN KEY (facility) REFERENCES HealthFacility(name)
);

CREATE TABLE HE_visit(
	patientID INT UNSIGNED,
	diagnosisID INT UNSIGNED,
	expertID INT UNSIGNED,
	`timestamp` timestamp,
	CONSTRAINT HE_Visit_PK PRIMARY KEY (patientID, diagnosisID, expertID),
	CONSTRAINT HE_Visit_Patient_FK FOREIGN KEY (patientID) REFERENCES Patient(ID),
	CONSTRAINT HE_Visit_Diagnosis_FK FOREIGN KEY (diagnosisID) REFERENCES Diagnosis(ID),
	CONSTRAINT HE_Visit_Health_Expert_FK FOREIGN KEY (expertID) REFERENCES HealthExpert(ID)
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
	patientID INT UNSIGNED,
	diagnosisID INT UNSIGNED,
	HSAID INT UNSIGNED,
	symptomID INT UNSIGNED,
	`timestamp` timestamp,
	CONSTRAINT HSA_Visit_PK PRIMARY KEY (patientID, diagnosisID, HSAID, symptomID),
	CONSTRAINT HSA_visit_Patient_FK FOREIGN KEY (patientID) REFERENCES Patient(ID),
	CONSTRAINT HSA_visit_Diagnosis_FK FOREIGN KEY (diagnosisID) REFERENCES Diagnosis(ID),
	CONSTRAINT HSA_visit_SymptomsSheet_FK FOREIGN KEY (HSAID) REFERENCES HSA(ID),
	CONSTRAINT HSA_visit_HSA_FK FOREIGN KEY (symptomID) REFERENCES SymptomsSheet(ID)
	);