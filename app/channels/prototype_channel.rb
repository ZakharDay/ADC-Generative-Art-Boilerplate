class PrototypeChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'prototype_channel'

    logger.debug '========'
    logger.debug 'subscribed'
    logger.debug '========'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    logger.debug '========'
    logger.debug 'unsubscribed'
    logger.debug '========'
  end
end
