import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="d1deb171-c379-4305-91b8-05973f92247f",
    name="Search and Verify Request Listings",
    tc_id="TC-20",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"export_posts_to_csv_listed": "true", "dark_mode_toggle_listed": "false", "no_requests_match_message_shown": "true"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to {{global.base_url}}/acme', instruction_id='169b64fa-f6cd-4801-839a-138b9b6b8ec3'):
        variable_value_0 = var('{{global.base_url}}/acme')
        await page.goto(variable_value_0)
    
    async with testmu.step('Typing export in Search requests box', instruction_id='d068a8bf-250f-47c2-9bcb-505d13d54bc8'):
        element_1 = page.locator("internal:role=searchbox[name=\"Search requests\"i]")
        
        await testmu.fill(element_1, "export")
    
    async with testmu.step('Checking whether Export posts to CSV is listed'):
        set_var('export_posts_to_csv_listed', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {17: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(17).textContent.trim() === 'Export posts to CSV');\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=link[name="Export posts to CSV"i]'], query="whether the 'Export posts to CSV' link is present in the Requests list", expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="'Export posts to CSV' is listed."))
    
    async with testmu.step("whether the 'Dark mode toggle' control is visible in the page interface", instruction_id='c94b8f8d-61e4-4bdc-a559-f6b420c04745'):
        set_var('dark_mode_toggle_listed', await testmu.vision_query(page, "whether the 'Dark mode toggle' control is visible in the page interface", ""))
    
    async with testmu.step('Assertion check', instruction_id='fd2d327a-cddd-4858-8775-3202b1d19976'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "'Export posts to CSV' is listed.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{export_posts_to_csv_listed}}', 'store_key': 'export_posts_to_csv_listed', 'variable_refs': {'{{export_posts_to_csv_listed}}': 'true'}}, {'description': "'Dark mode toggle' is not listed.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'false', 'extracted_value': '{{dark_mode_toggle_listed}}', 'store_key': 'dark_mode_toggle_listed', 'variable_refs': {'{{dark_mode_toggle_listed}}': 'false'}}], 'sub_checks': [{'description': "'Export posts to CSV' is listed.", 'store_key': 'export_posts_to_csv_listed', 'expected_value': 'true', 'extracted_value': '{{export_posts_to_csv_listed}}', 'operator': 'equals', 'transforms': []}, {'description': "'Dark mode toggle' is not listed.", 'store_key': 'dark_mode_toggle_listed', 'expected_value': 'false', 'extracted_value': '{{dark_mode_toggle_listed}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "'Export posts to CSV' is listed and 'Dark mode toggle' is not."})
    
    async with testmu.step('Typing zzqxnomatch into the search box', instruction_id='b452af75-a182-4028-a733-92d02a137a74'):
        element_2 = page.locator("internal:role=searchbox[name=\"Search requests\"i]")
        
        await testmu.fill(element_2, "zzqxnomatch")
    
    async with testmu.step('Checking whether the no-matching-requests message is present'):
        set_var('no_requests_match_message_shown', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {15: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(15).textContent.includes('No requests match'));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:text="No requests match \\""i'], query="whether the message 'No requests match' is present in the requests search results", expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="the message 'No requests match' is shown."))
    
    async with testmu.step('Assertion check', instruction_id='55e525f0-93cc-44fd-9dae-564fc55470e8'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "the message 'No requests match' is shown.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{no_requests_match_message_shown}}', 'store_key': 'no_requests_match_message_shown', 'variable_refs': {'{{no_requests_match_message_shown}}': 'true'}}], 'sub_checks': [{'description': "the message 'No requests match' is shown.", 'store_key': 'no_requests_match_message_shown', 'expected_value': 'true', 'extracted_value': '{{no_requests_match_message_shown}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "the message 'No requests match' is shown."})


if __name__ == "__main__":
    testmu.run(test)