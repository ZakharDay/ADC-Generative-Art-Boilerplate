require "application_system_test_case"

class PrototypesTest < ApplicationSystemTestCase
  setup do
    @prototype = prototypes(:one)
  end

  test "visiting the index" do
    visit prototypes_url
    assert_selector "h1", text: "Prototypes"
  end

  test "creating a Prototype" do
    visit prototypes_url
    click_on "New Prototype"

    fill_in "Description", with: @prototype.description
    fill_in "Name", with: @prototype.name
    click_on "Create Prototype"

    assert_text "Prototype was successfully created"
    click_on "Back"
  end

  test "updating a Prototype" do
    visit prototypes_url
    click_on "Edit", match: :first

    fill_in "Description", with: @prototype.description
    fill_in "Name", with: @prototype.name
    click_on "Update Prototype"

    assert_text "Prototype was successfully updated"
    click_on "Back"
  end

  test "destroying a Prototype" do
    visit prototypes_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Prototype was successfully destroyed"
  end
end
