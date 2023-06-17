import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import factory from './factory_mid.png';

const handleStyle = { left: 10 };

function PictureNode2({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <Handle 
      type="target" 
      position={Position.left} 
      isConnectable={isConnectable} 
      />
      <div>
        <label htmlFor="text" class="text-center"> Tags: factory, construction </label>
            <div>
           <img
        src= {factory}
        style={{ width: "300px" }}
        />
          </div>
      </div>
    </div>
  );
}

export default PictureNode2;
