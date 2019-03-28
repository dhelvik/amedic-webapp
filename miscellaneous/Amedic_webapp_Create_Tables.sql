CREATE TABLE Treatment(
	ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	description VARCHAR(255),
	treatment_Scheme VARCHAR(255),
	drug VARCHAR(255),
	drug_administration VARCHAR(255)
);

CREATE TABLE Diagnosis(
	ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255), 
	description VARCHAR(255),
	`class` VARCHAR(255)
);

CREATE TABLE Treatment_Diagnosis(
	treatment_id INT UNSIGNED,
	diagnosis_id INT UNSIGNED,
	CONSTRAINT Treatment_Diagnosis_PK PRIMARY KEY (treatment_id, diagnosis_id),
	CONSTRAINT  Treatment_Diagnosis_TreatmentID_FK FOREIGN KEY (treatment_id) REFERENCES Treatment(ID),
	CONSTRAINT Treatment_Diagnosis_DiagnosisID_FK FOREIGN KEY (diagnosis_id) REFERENCES Diagnosis(ID)
);

CREATE TABLE District(
	name VARCHAR(255) PRIMARY KEY
);

CREATE TABLE Village(
	name VARCHAR(255) PRIMARY KEY,
	district_name VARCHAR(255),
	CONSTRAINT Village_District_Name_FK FOREIGN KEY (district_name) REFERENCES District(name)
);

CREATE TABLE Health_Facility(
	name VARCHAR(255) PRIMARY KEY,
	village_name VARCHAR(255),
	CONSTRAINT Villager_Name_FK FOREIGN KEY (village_name) REFERENCES Village(name)
);

CREATE TABLE CareGiver(
	ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255),
	national_id INT UNIQUE,
	relation_to_patient VARCHAR(255),
	date_of_birth DATE,
	mobile_no VARCHAR(255)
);

CREATE TABLE Patient(
	ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255),
	national_id INT UNIQUE,
	mobile_no INT,
	sex VARCHAR(10),
	village_name VARCHAR(255),
	date_of_birth DATE,
	CONSTRAINT Patient_Village_Name_FK FOREIGN KEY (village_name) REFERENCES Village(name)
);

CREATE TABLE CareGiver_Patient(
	caregiver_id INT UNSIGNED,
	patient_id INT UNSIGNED,
	PRIMARY KEY (caregiver_id, patient_id),
	CONSTRAINT Patient_ID_FK FOREIGN KEY (patient_id) REFERENCES Patient(ID),
	CONSTRAINT CareGiver_ID_FK FOREIGN KEY (caregiver_id) REFERENCES CareGiver(ID)
);

CREATE TABLE Symptoms_Sheet(
	ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	description VARCHAR(255),
	cough BOOLEAN,
	cough_days INT,
	diarrhoea BOOLEAN,
	diarrhoea_days INT,
	blood_in_stool VARCHAR(255),
	fever INT,
	fever_days INT,
	convulsions VARCHAR(255),
	difficult_to_eat_drink BOOLEAN,
	cannot_eat_drink BOOLEAN,
	vomiting BOOLEAN,
	vomits_everything BOOLEAN,
	red_eyes BOOLEAN,
	red_eyes_days INT,
	difficulties_to_see BOOLEAN,
	difficulties_to_see_days INT,
	chest_indraw VARCHAR(255),
	breathing_freq INT,
	sleepy VARCHAR(255),
	unconscious VARCHAR(255),
	palmar_palor VARCHAR(255),
	muac VARCHAR(255),
	swollen_feet VARCHAR(255)
);
 
 CREATE TABLE AMED_User (
	ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255),
	national_id INT,
	date_of_birth DATE,
	mobile_no VARCHAR(255),
	email VARCHAR(255),
	login_id VARCHAR(255),
	password VARCHAR(255),
	hsa_flag BOOLEAN,
	admin_flag BOOLEAN,
	health_expert_flag BOOLEAN,
	health_facility_name VARCHAR(255),
	CONSTRAINT Health_Facility_Name_FK FOREIGN KEY (health_facility_name) REFERENCES Health_Facility(name)
 );
 
 CREATE TABLE Visit (
	ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	symptoms_sheet_id INT UNSIGNED UNIQUE,
	patient_id INT UNSIGNED NOT NULL,
	user_id INT UNSIGNED NOT NULL,
	CONSTRAINT Symptom_Sheet_ID_FK FOREIGN KEY (symptoms_sheet_id) REFERENCES Symptoms_Sheet(ID),
	CONSTRAINT Patient_ID_FK FOREIGN KEY (patient_id) REFERENCES Patient(ID),
	CONSTRAINT Amed_User_ID_FK FOREIGN KEY (user_id) REFERENCES AMED_User(ID)
 );

 CREATE TABLE Diagnosis_Visit (
	visit_id INT UNSIGNED,
	diagnosis_id INT UNSIGNED,
	PRIMARY KEY (visit_id, diagnosis_id),
	CONSTRAINT VD_Visit_ID_FK FOREIGN KEY (visit_id) REFERENCES Visit(ID),
	CONSTRAINT VD_Diagnosis_ID_FK FOREIGN KEY (diagnosis_id) REFERENCES Diagnosis(ID)
 );
 CREATE TABLE Notes(
	ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	description VARCHAR(255),
	`timestamp` timestamp,
	visit_id INT UNSIGNED NOT NULL,
	health_expert_id INT UNSIGNED NOT NULL,
	CONSTRAINT Visit_ID_FK FOREIGN KEY (visit_id) REFERENCES Visit(ID),
	CONSTRAINT Health_Expert_ID_FK FOREIGN KEY (health_expert_id) REFERENCES AMED_User(ID)
 ); 


