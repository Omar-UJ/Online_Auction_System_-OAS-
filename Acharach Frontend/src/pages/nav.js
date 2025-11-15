import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import enFlag from '../img/en.png';
import amFlag from '../img/am.png';
import global_en from '../translations/en/global.json';
import global_am from '../translations/am/global.json';
import i18n from './i18n';
import { initReactI18next } from 'react-i18next';

<style jsx>{`

     `}</style>

 // Initialize i18next with translations
 i18n.use(initReactI18next).init({
    resources: {
      en: { translation: global_en },
      am: { translation: global_am },
    },
    lng: localStorage.getItem('lang') || 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

function Nav() {
     const { t } = useTranslation();


  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
  };

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    
  }, []);

  return (
    <React.Fragment>
      <div>
        <nav className="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
          <div className="container">
          <div class="header-logo">
        						<a href="/" title="Bidout">
															<img class="img-fluid" 
                              width={'35px'}
                height={'35px'}  
                src={`/img/img/photo_2023-02-13_22-24-17.jpg`} alt="Bidout"/>
                  </a>
										    </div>
                        {t("tittle.message")}
            
            <button
              data-toggle="collapse"
              className="navbar-toggler"
              data-target="#navcol-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navcol-1">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link active" href="/">
                    {t("home.message")}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/auction-list">
                    {t("auctionList.message")}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/services">
                    {t("service.message")}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/features">
                    {t("feature.message")}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/plan">
                    {t("pricing.message")}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about-us">
                    {t("aboutUs.message")}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/contact-us">
                    {t("contactUs.message")}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">
                    <img width={'30px'}
                height={'30px'}  src={`/img/icon/sign_document_25px.png`} alt="Register" />
                    {t("register.message")}
                  </a>
                </li>
                <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="/"
              id="languageDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img width={'30px'}
                height={'30px'}  src={i18n.language === "en" ? enFlag : amFlag} alt="Flag" />
                    {t("language.message")}

            </a>
            <div className="dropdown-menu" aria-labelledby="languageDropdown">
              <button
                className="dropdown-item"
                onClick={() => changeLanguage("en")}
              >
                <img width={'20px'}
                height={'20px'} src={enFlag} alt="English Flag" /> English
              </button>
              <button
                className="dropdown-item"
                onClick={() => changeLanguage("am")}
              >
                <img width={'20px'}
                height={'20px'} src={amFlag} alt="Amharic Flag" /> Amharic
              </button>
            </div>
          </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
}

export default Nav;
