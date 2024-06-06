// STRong Intentional Perturbation Page
import React, { useState } from "react";
import Navbar from "../../components/header";
import Footer from "../../components/footer";

import UploadSection from "../../components/input/defenses/uploadSectionDefense";
import STRIPInput from "../../components/input/defenses/stripInput";

import "../../styles/defenses/STRongIntentionalPerturbation.css";

let pageTitle = "STRong Intentional Perturbation";

function STRongIntentionalPerturbation() {
  const [vulnerableFileUploaded, setVulnerableFileUploaded] = useState(false);
  const [robustFileUploaded, setRobustFileUploaded] = useState(false);
  const [datasetSelected, setDatasetSelected] = useState(false);
  const [showPersonalUpload, setShowPersonalUpload] = useState(false);

  const [vulnerableModelFile, setVulnerableRobustModelFile] = useState(null);
  const [robustModelFile, setRobustModelFile] = useState(null);
  const [personalDataset, setPersonalDataset] = useState(null);
  const [alreadyCompiled, setAlreadyCompiled] = useState(false);

  /* *** */

  const [epochs, setEpochs] = useState(1);
  const [batchSize, setBatchSize] = useState(32);
  const [poisonPercentage, setPoisonPercentage] = useState(0.3);

  /* ******************************************************************************************* */

  const handleFileUploadVulnerable = (event) => {
    const file = event.target.files[0];
    setVulnerableFileUploaded(!!file);
    setVulnerableRobustModelFile(file);
  };

  const handleFileUploadModelRobust = (event) => {
    const file = event.target.files[0];
    setRobustFileUploaded(!!file);
    setRobustModelFile(file);
  };

  const handlePersonalDatasetUpload = (event) => {
    const directory = event.target.files;
    setPersonalDataset(directory);
    if (directory.length > 0) {
      setDatasetSelected(true);
    } else {
      setDatasetSelected(false);
    }
  };

  const handleAlreadyCompiledChange = (event) => {
    setAlreadyCompiled(event.target.checked);
  };

  const handleCheckboxChange = (event) => {
    if (vulnerableFileUploaded && robustFileUploaded) {
      const isPersonal = event.target.value === "personal";
      setShowPersonalUpload(isPersonal);
      setDatasetSelected(!isPersonal);
    }
  };

  /* ******************************************************************************************* */

  const handleEpochsChange = (event) => {
    const newValue = event.target.value;
    if (newValue === "" || (/^\d+$/.test(newValue) && parseInt(newValue) > 0)) {
      setEpochs(newValue);
    }
  };

  const handleBatchSizeChange = (event) => {
    const newValue = event.target.value;
    if (newValue === "" || (/^\d+$/.test(newValue) && parseInt(newValue) > 0)) {
      setBatchSize(newValue);
    }
  };

  /* ******************************************************************************************* */

  const handleLaunchClick = () => {
    console.log("Launch");
  };

  /* ******************************************************************************************* */
  return (
    <div id="root">
      <Navbar pageTitle={pageTitle} />
      <div className="page-content container mt-3">
        {/* First Section */}
        <p className="description">
          Implementation of STRIP: A Defence Against Trojan Attacks on Deep
          Neural Networks (Gao et. al. 2020)
        </p>
        <a href="https://arxiv.org/abs/1902.06531">See Details Here</a>
        <a href="https://openreview.net/forum?id=SyJ7ClWCb">See Details Here</a>
        {/* Horizontal Divider */}
        <hr />
        {/* Upload Section */}
        <div className="row">
          <div className="col-md-5">
            <UploadSection
              vulnerableFileUploaded={vulnerableFileUploaded}
              robustFileUploaded={robustFileUploaded}
              alreadyCompiled={alreadyCompiled}
              showPersonalUpload={showPersonalUpload}
              attackName={pageTitle}
              handleFileUploadVulnerable={handleFileUploadVulnerable}
              handleFileUploadModelRobust={handleFileUploadModelRobust}
              handlePersonalDatasetUpload={handlePersonalDatasetUpload}
              handleAlreadyCompiledChange={handleAlreadyCompiledChange}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
          {/* Vertical Divider */}
          <div className="col-md-2 d-flex align-items-center justify-content-center">
            <div className="vr custom-vr"></div>
          </div>
          {/* Input Section */}
          <div className="col-md-5">
            <STRIPInput
              epochs={epochs}
              handleEpochsChange={handleEpochsChange}
              batchSize={batchSize}
              handleBatchSizeChange={handleBatchSizeChange}
              poisonPercentage={poisonPercentage}
              handlePoisonPercentageChange={handlePoisonPercentageChange}
              datasetSelected={datasetSelected}
            />
            {/* Launch Button */}
            <div className="launch-button-section text-end">
              <button
                className="btn btn-primary"
                disabled={!datasetSelected}
                onClick={handleLaunchClick}
              >
                Launch
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default STRongIntentionalPerturbation;
