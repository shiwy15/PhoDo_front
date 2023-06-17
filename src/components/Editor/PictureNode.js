import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function PictureNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <div>
        <label htmlFor="text" class="text-center"> Tags: factory, construction </label>
            <div>
           <img
        src= {data.url}
        style={{ width: "300px" }}
        />
          </div>
      </div>
    </div>
  );
}

export default PictureNode;
