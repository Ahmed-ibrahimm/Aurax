// import ReactJs and useState function
import React, { useState, useEffect } from "react";
// import GoogleAI from the googel/genai we installed
import { GoogleGenAI } from "@google/genai";
// import our files
import "./main.css";
import { assets } from "../../assets/assets/assets";

// the apikey used from google gemini
const apiKey =  import.meta.env.VITE_API_KEY_5;
const ai = new GoogleGenAI({ apiKey });

/* start the main part of the page consists of the navigation bar contains the logo and photo 
and the middle main-container part containing the overview in the start and the content of the request after 
the request and the footer part containing our links */
const Main = () => {
  // the useStates we use
  const [clicked, setClicked] = useState(false);
  const [inputValue, setInputValue] = useState();
  const [contentState, setContentState] = useState(false);
  const [outputText, setOutputText] = useState();
  const [loading, setLoading] = useState(false);
  const [displayText, setDisplayText] = useState();

  useEffect(() => {
    if (!outputText) return;
    setDisplayText("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => prev + outputText.charAt(i));
      i++;
      if (i >= outputText.length) clearInterval(interval);
    }, 10);

    return () => clearInterval(interval);
  }, [outputText]);

  return (
    <>
      <div className="main">
        <div className="navigation-bar">
          <p>Aurax</p>
          <img src={assets.main_icon} alt="" />
        </div>
        {loading ? (
          <>
            <div className="main-container">
              <div className="content-container">
                <div className="loading-fixed">
                  <div className="loading-image">
                    <img src={assets.main_icon} alt="" />
                  </div>
                  <p className="loading-text">{inputValue} ?</p>
                </div>
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {clicked ? (
              <>
                <div className="head-container-response">
                  Aurax here. Here is what I found:
                </div>
                <div className="main-container">
                  <div className="content-container">
                    <div className="question-container">
                      <p>{inputValue} ?</p>
                    </div>
                    <div className="response-container">
                      <img src={assets.main_icon} alt="" />
                      <p>{displayText}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </>
        )}
        {contentState ? null : (
          <>
            <div className="main-container">
              <div className="greet">
                <p>
                  Hello, I'm <span>Aurax.</span>
                </p>
                <p>How can i help you today?</p>
              </div>
              <div className="cards">
                <div className="card">
                  <p>Suggest beautiful places to see the road trip</p>
                  <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                  <p>Briefly summarize this concept: urban planning</p>
                  <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                  <p>Brainstorming team activities for our work</p>
                  <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                  <p>Improve the readability of the following code</p>
                  <img src={assets.code_icon} alt="" />
                </div>
              </div>
            </div>
          </>
        )}
        <div className="main-container">
          <div className="main-bottom">
            <div className="search-box">
              <input
                type="text"
                placeholder="Ask anything..."
                id="input-field"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div className="box-imgs">
                <img
                  src={assets.send_icon}
                  alt=""
                  className="send-message"
                  onClick={async () => {
                    setClicked(true);
                    setLoading(true);
                    setContentState(true);
                    try {
                      const response = await ai.models.generateContent({
                        model: "gemini-3-flash-preview",
                        contents: inputValue,
                      });
                      setOutputText(response.text);
                    } catch {
                      setOutputText(" Error, you have reached your limit of questions.");
                      setContentState(false);
                    } finally {
                      setLoading(false);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <p>© {new Date().getFullYear()} All Rights Reserved</p>
          <div className="links">
            <a href="https://www.linkedin.com/in/ahmed-ibrahim-167361323?utm_source=share_via&utm_content=profile&utm_medium=member_android">
              Linkedin
            </a>
            <a href="https://www.facebook.com/share/1859Ns7kDp/">
              <span className="facebook">Facebook</span>
            </a>
            <a href="https://www.instagram.com/theahmedibrahem?igsh=MWd2Z2FkeXhuaWJlMg==">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
