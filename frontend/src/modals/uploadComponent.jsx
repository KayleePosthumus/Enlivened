import React from 'react';

const UploadComponent = () => {
    return (
        <div class="card text-center">
            <div class="card-body">
                <h5 class="card-title">Upload Images</h5>
                <input id="upload" type="file" onchange="readURL(this);" class="form-control border-0"/>
                <div class="input-group-append">
                    <label for="upload" class="btn btn-light m-0 rounded-pill px-4"> <i class="fa fa-cloud-upload mr-2 text-muted"></i><small class="text-uppercase font-weight-bold text-muted">Choose file</small></label>
                    <button type="button" class="btn btn-primary" style="margin-top: 10px;" data-bs-dismiss="modal" onclick="open_win()">Submit</button>
                </div>   
            </div>
        </div>
    );
}

export default UploadComponent;
