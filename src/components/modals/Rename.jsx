import React from 'react';

const Rename = (props) => {

  const vdom = (
    <>
      <div className="modal fade show" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Rename
                {1}
                channel
              </h5>
              <button type="button" className="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              ...input...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary">Close</button>
              <button type="button" className="btn btn-primary">Rename</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
  return vdom;
};

export default Rename;
