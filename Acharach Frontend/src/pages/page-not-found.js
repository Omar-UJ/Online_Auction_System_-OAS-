import React from "react"
import Nav from "./nav"
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Bootstrap JavaScript
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import enTranslation from '../translations/en/global.json';
import amTranslation from '../translations/am/global.json';
     // Initialize i18next with translations
i18n.use(initReactI18next).init({
    resources: {
      en: { translation: enTranslation },
      am: { translation: amTranslation },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

function Welcome(){
    return(
        <div>
            <Nav/>
           <div class="container-fluid" style={{marginTop:"100px",height:"600px"}}>
                    <div class="text-center mt-5">
                        <div class="error mx-auto" data-text="404">
                            <p class="m-0">404 Page Not Found!</p>
                        </div>
                        <p class="text-dark mb-5 lead">
It looks like you've reached a URL that doesn’t exist.</p>
                        <p class="text-black-50 mb-0"> Please use the navigation above or search below to find your way back to our amazing website</p><a href="/">← Back to Home</a>
                    </div>
                </div>
            </div>
    )
    }

export default Welcome;