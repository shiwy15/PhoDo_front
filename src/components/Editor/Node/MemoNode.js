import { useState } from 'react';

function MemoNode({ data, isConnectable }) {

  const [content, setContent] = useState(data.content);

  const onContentChange = (evt) => {
    setContent(evt.target.value);
    console.log(evt.target.value);
  };

  return (
    <div
      className="note"
      style={{
        position: 'relative',
        background: '#FFFF99',
        background: 'linear-gradient(-150deg, transparent 1.5em, #FFFF99 0)',
        width: '300px',
        height: '250px',
        padding: '10px',
        color: 'white',
        borderRadius: '.5em',
      }}
    >
      <div
        className="foldedCorner"
        style={{
          content: "''",
          position: 'absolute',
          top: '0',
          right: '0',
          background:
            'linear-gradient(to left bottom, transparent 50%, rgba(0,0,0,.2) 0, rgba(0,0,0,.4)) 100% 0 no-repeat',
          width: '1.73em',
          height: '3em',
          transform: 'translateY(-1.3em) rotate(-30deg)',
          transformOrigin: 'bottom right',
          borderBottomLeftRadius: 'inherit',
          boxShadow: '-.2em .2em .3em -.1em rgba(0,0,0,.15)',
        }}
      ></div>
      <div className="content" style={{ padding: '20px' }}>
        <textarea
          id="content"
          value={content}
          onChange={onContentChange}
          className="overflow-auto"
          rows={7}
          style={{
            resize: 'none',
            width: '100%',
            height: '100%',
            border: 'none',
            outline: 'none',
            backgroundColor: '#FFFF99',
            marginTop: '5px',
            color: 'black',
          }}
        ></textarea>
      </div>
    </div>
  );
}

export default MemoNode;
