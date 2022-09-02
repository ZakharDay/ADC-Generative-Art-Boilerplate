class ArduinoService
  def initialize
    # @sp = SerialPort.new "/dev/tty.usbmodem101", 9600
    @sp = SerialPort.new "/dev/tty.usbserial-10", 9600
  end

  def get_data
    @sp.gets
  end

  def create_data_stream
    while data = @sp.gets
      # Rails.logger.debug data
      ActionCable.server.broadcast 'prototype_channel', data
    end
  end
end

# class ArduinoService
#   def initialize
#     port_str = "/dev/tty.usbmodem101"
#     baud_rate = 9600
#     data_bits = 8
#     stop_bits = 1
#     parity = SerialPort::NONE
#
#     if port_connected?(port_str)
#       unless $sp
#         Rails.logger.debug 'Port is not connected, connecting...'
#         $sp = SerialPort.new(port_str, baud_rate, data_bits, stop_bits, parity)
#       end
#
#       r = order_confirmation
#
#       Rails.logger.debug 'Arduino Port Connected'
#       Rails.logger.debug r
#       r
#     else
#       Rails.logger.debug 'Arduino Port Not Connected'
#       nil
#     end
#   end
#
#   def order_confirmation
#     sleep 10
#     $sp.write(0)
#     Rails.logger.debug 'YO'
#     Rails.logger.debug $sp.gets.chomp
#     resistance = $sp.gets.chomp
#     # sleep 3
#     # $sp.flush
#     # sp.close
#
#     resistance
#   end
#
#   def get_resistance
#     $sp.gets.chomp
#   end
#
#   def get_everything
#     $sp.gets
#   end
#
#   def port_connected?(port)
#     return true if Dir.glob(port).count == 1
#   end
# end
#
# $ohm_meter = ArduinoService.new
