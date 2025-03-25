CREATE TABLE IF NOT EXISTS LoginCredential (
    Username VARCHAR(36) UNIQUE NOT NULL,
    Password CHAR(60) NOT NULL,
    PRIMARY KEY (Username)
);

CREATE TABLE IF NOT EXISTS User (
    Username VARCHAR(36) UNIQUE NOT NULL,
    IsAdmin BOOL,
    FirstName VARCHAR(36) NOT NULL,
    LastName VARCHAR(36) NOT NULL,
    Level TINYINT UNSIGNED NOT NULL CHECK (Level BETWEEN 0 AND 4),
    Title VARCHAR(36) NOT NULL,
    PRIMARY KEY (Username),
    FOREIGN KEY (Username) REFERENCES LoginCredential(Username)
);

CREATE TABLE IF NOT EXISTS FormTemplate (
    FormIdentifier VARCHAR(100) NOT NULL,
    FormTitle VARCHAR(255) NOT NULL,
    FormDescription TEXT,
    PRIMARY KEY (FormIdentifier)
);

CREATE TABLE IF NOT EXISTS FormTemplateContent (
    FormTemplateContentID INT UNSIGNED AUTO_INCREMENT,
    FormTemplateIdentifier VARCHAR(100),
    ContentName VARCHAR(100) NOT NULL,
    ContentType VARCHAR(100) NOT NULL,
    PRIMARY KEY (FormTemplateContentID),
    FOREIGN KEY (FormTemplateIdentifier) REFERENCES FormTemplate(FormIdentifier)
);

CREATE TABLE IF NOT EXISTS FormTemplateSignature (
    FormTemplateSignatureID INT UNSIGNED AUTO_INCREMENT,
    FormTemplateIdentifier VARCHAR(100),
    Level TINYINT UNSIGNED CHECK (Level BETWEEN 0 AND 4),
    Title VARCHAR(36) NOT NULL,
    PRIMARY KEY (FormTemplateSignatureID),
    FOREIGN KEY (FormTemplateIdentifier) REFERENCES FormTemplate(FormIdentifier)
);

CREATE TABLE IF NOT EXISTS Form (
    FormID INT UNSIGNED AUTO_INCREMENT,
    FormTemplateIdentifier VARCHAR(100),
    ApplicantUsername VARCHAR(36),
    IsArchived BOOL,
    PublishDate DATETIME,
    PRIMARY KEY (FormID),
    FOREIGN KEY (ApplicantUsername) REFERENCES User(Username),
    FOREIGN KEY (FormTemplateIdentifier) REFERENCES FormTemplate(FormIdentifier)
);

CREATE TABLE IF NOT EXISTS FormContent (
    FormContentID INT UNSIGNED AUTO_INCREMENT,
    FormID INT UNSIGNED,
    FormTemplateContentID INT UNSIGNED,
    ContentData BLOB,
    PRIMARY KEY (FormContentID),
    FOREIGN KEY (FormID) REFERENCES Form(FormID),
    FOREIGN KEY (FormTemplateContentID) REFERENCES FormTemplateContent(FormTemplateContentID)
);

CREATE TABLE IF NOT EXISTS FormSignature (
    FormSignatureID INT UNSIGNED AUTO_INCREMENT,
    FormID INT UNSIGNED,
    FormTemplateSignatureID INT UNSIGNED,
    Username VARCHAR(36),
    IsSigned BOOL,
    IsApproved BOOL,
    DenialReason VARCHAR(200),
    Signature VARCHAR(100),
    Date DATETIME,
    PRIMARY KEY (FormSignatureID),
    FOREIGN KEY (Username) REFERENCES User(Username),
    FOREIGN KEY (FormID) REFERENCES Form(FormID),
    FOREIGN KEY (FormTemplateSignatureID) REFERENCES FormTemplateSignature(FormTemplateSignatureID)
);