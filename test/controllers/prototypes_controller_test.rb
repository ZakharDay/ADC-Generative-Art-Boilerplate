require "test_helper"

class PrototypesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @prototype = prototypes(:one)
  end

  test "should get index" do
    get prototypes_url
    assert_response :success
  end

  test "should get new" do
    get new_prototype_url
    assert_response :success
  end

  test "should create prototype" do
    assert_difference('Prototype.count') do
      post prototypes_url, params: { prototype: { description: @prototype.description, name: @prototype.name } }
    end

    assert_redirected_to prototype_url(Prototype.last)
  end

  test "should show prototype" do
    get prototype_url(@prototype)
    assert_response :success
  end

  test "should get edit" do
    get edit_prototype_url(@prototype)
    assert_response :success
  end

  test "should update prototype" do
    patch prototype_url(@prototype), params: { prototype: { description: @prototype.description, name: @prototype.name } }
    assert_redirected_to prototype_url(@prototype)
  end

  test "should destroy prototype" do
    assert_difference('Prototype.count', -1) do
      delete prototype_url(@prototype)
    end

    assert_redirected_to prototypes_url
  end
end
