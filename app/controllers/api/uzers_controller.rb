class Api::UzersController < ApplicationController

    def index
      render json: Uzer.all
    end
    
    def test_upload1
      file = params[:file]
      

      if file
       
        begin
            puts 'Before upload'
            # save to cloudinary
            cloud_image = Cloudinary::Uploader.upload(file, 
                public_id: file.original_filename, 
                secure: true, 
                resource_type: :auto) 
     
            # if succesfull, i can grab image url like this
            puts '---------'
            puts cloud_image
            image_url = cloud_image['secure_url']

            # take image url and save to Database
            user = Uzer.new(uzer_params) 
            user.image = image_url 
            if user.save
                render json: user
            end
        rescue => e
            binding.pry
            render json: {errors: e}, status: 422 
        end
      end
    end

    private
    def uzer_params
      params.permit(:name)
    end

end
