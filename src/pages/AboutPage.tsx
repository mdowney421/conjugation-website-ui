const AboutPage = () => {
  return (
    <>
      <div className="page-header">
        <h1>About The ConjuGator</h1>
        <p>A free tool for learning Spanish verb conjugation.</p>
      </div>

      <div className="about-content">
        <h2>What it does</h2>
        <p>
          The ConjuGator has two modes: browse the full verb list to look up
          a conjugation you need right now, or jump into practice mode for a
          quiz that quizzes you on random verbs across the tenses you
          choose.
        </p>

        <h2>Practice, your way</h2>
        <p>
          Before each round, pick whether you want irregular verbs in the
          mix, whether to include the "vosotros" form, and which tenses to
          drill — present, preterite, future, and beyond. The ConjuGator
          then quizzes you one verb at a time and tells you right away
          whether your answer was correct.
        </p>

        <h2>Built for learners</h2>
        <p>
          Whether you're brushing up before a trip or working through a
          Spanish course, The ConjuGator is meant to be a quick, no-friction
          reference and drill tool you can come back to as often as you
          like.
        </p>
      </div>
    </>
  );
};

export default AboutPage;
