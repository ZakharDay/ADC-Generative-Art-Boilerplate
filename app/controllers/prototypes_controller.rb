class PrototypesController < ApplicationController
  before_action :set_prototype, only: %i[ show stream edit update destroy ]

  # GET /prototypes or /prototypes.json
  def index
    # sleep 10
    @prototypes = Prototype.all
  end

  # GET /prototypes/1 or /prototypes/1.json
  def show
    # if @prototype.id === 47
    #   arduino = ArduinoService.new
    #   # data = arduino.get_data
    #   arduino.create_data_stream
    #
    #   # logger.debug "======="
    #   # logger.debug data
    #   # logger.debug "======="
    #
    #   # ActionCable.server.broadcast 'prototype47_channel', { data: data }.as_json
    #
    #   # while s = arduino.get_data
    #   #   logger.debug "======="
    #   #   logger.debug s
    #   #   logger.debug "======="
    #   # end
    # end
  end

  def stream
    if @prototype.id === 47 || @prototype.id === 50
      arduino = ArduinoService.new
      # data = arduino.get_data
      arduino.create_data_stream

      # logger.debug "======="
      # logger.debug data
      # logger.debug "======="

      # ActionCable.server.broadcast 'prototype47_channel', { data: data }.as_json

      # while s = arduino.get_data
      #   logger.debug "======="
      #   logger.debug s
      #   logger.debug "======="
      # end
      render json: {}
    end
  end

  # GET /prototypes/new
  def new
    @prototype = Prototype.new
  end

  # GET /prototypes/1/edit
  def edit
  end

  # POST /prototypes or /prototypes.json
  def create
    @prototype = Prototype.new(prototype_params)

    respond_to do |format|
      if @prototype.save
        format.html { redirect_to prototype_url(@prototype), notice: "Prototype was successfully created." }
        format.json { render :show, status: :created, location: @prototype }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @prototype.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /prototypes/1 or /prototypes/1.json
  def update
    respond_to do |format|
      if @prototype.update(prototype_params)
        format.html { redirect_to prototype_url(@prototype), notice: "Prototype was successfully updated." }
        format.json { render :show, status: :ok, location: @prototype }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @prototype.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /prototypes/1 or /prototypes/1.json
  def destroy
    @prototype.destroy

    respond_to do |format|
      format.html { redirect_to prototypes_url, notice: "Prototype was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_prototype
      @prototype = Prototype.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def prototype_params
      params.require(:prototype).permit(:name, :description)
    end
end
