import React from 'react';


const AddQuestion = () => {
  return (
    <div>
        <p>Ask Your Question</p>
        <br></br>
        <p>About the "Produc Name"</p>
        <br></br>
        <form>
          <label> Your Questiona: *
            <input name="question" type="text" value={setQuestion(question)}
              onChange={this.handleChangeQuestion} />
          </label>
          <br></br>
          <label> What is your nickname *
            <input name="nickname" type="text" placeholder="Example: jackson11!" value={setNickname(nickname)}
              onChange={this.handleChangeNickname} />
              For privacy reasons, do not use your full name or email address
          </label>
          <br></br>
          <label> Your email: *
            <input name="password" placeholder="Why did you like the product or not?" type="text" value={setEmail(email)}
              onChange={this.handleChangeEmail} />
              For authentication reasons, you will not be emailed
          </label>
        </form>
        <br></br>
        <p>This is Form1 page</p>
        <br></br>
        <button onClick={this.handleClickSubmit}>Submit</button>
      </div>
  )
}