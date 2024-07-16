from fastapi.testclient import TestClient
from main import app
from services.prediction import PredictionService
import pytest

client = TestClient(app)

class MockPredictionService:
    def predict(self, data):
        return {
    "10001": -14.007472293778436,
    "10002": -13.67464605148454,
    "10003": -8.899362016082247,
    "10004": -15.970925805631135,
    "10005": -19.62610279269961,
    "10006": -12.32717247418075,
    "10007": -12.426946536507772,
    "10009": -12.418770553586775,
    "10010": -10.284899860262655,
    "10011": -9.226700790199137,
    "10012": -16.765717622947182,
    "10013": -5.462985546214595,
    "10014": -15.654780277583889,
    "10016": -13.977173312902266,
    "10017": -9.419345922637714,
    "10018": -12.169199051059378,
    "10019": -12.061697622565907,
    "10020": -7.950989719486566,
    "10021": -10.630118663124179,
    "10022": -8.628022324803576,
    "10023": -7.801800850427027,
    "10024": -13.992186214465999,
    "10025": -16.60535978012192,
    "10026": -12.100610005404155,
    "10027": -11.124408920626964,
    "10028": -14.786458291051705,
    "10029": -6.664372461137696,
    "10030": -19.219646806244278,
    "10031": -15.583007111063756,
    "10032": -15.748356916730362,
    "10033": -3.492887814789688,
    "10034": -10.254542975251109,
    "10035": -10.787333574958073,
    "10036": -5.4063597000297445,
    "10037": -11.810982488746163,
    "10038": -14.993408833262883,
    "10039": -9.938842198898316,
    "10040": -9.874752942863662,
    "10044": -11.149863218601906,
    "10065": -12.447503552061216,
    "10069": -14.037859735722273,
    "10075": -10.127210980878639,
    "10103": -9.05658090179288,
    "10110": -17.08713056034775,
    "10111": -14.08406486315115,
    "10112": -8.943612245865845,
    "10119": -9.448884133472422,
    "10128": -12.043061632475915,
    "10152": -4.341314236313149,
    "10153": -14.24160407456535,
    "10154": -7.594848307026721,
    "10162": -12.168097764265214,
    "10165": -10.020537061666198,
    "10167": -12.813090390053988,
    "10168": -13.091354491678517,
    "10169": -9.7286148534626,
    "10170": -10.465870461779685,
    "10171": -10.816838680622372,
    "10172": -13.65921568293373,
    "10173": -13.0083036669723,
    "10174": -10.595662402964615,
    "10177": -9.7475280161293,
    "10271": -13.712565870106033,
    "10278": -12.234298480781046,
    "10279": -11.590077160368988,
    "10280": -12.371123372731553,
    "10282": -13.582794522094217,
    "10301": -10.976431481886621,
    "10302": -9.318965551704514,
    "10303": -17.557538531430563,
    "10304": -11.251822622789433,
    "10305": -4.2463660854471454,
    "10306": -11.793817599735105,
    "10308": -7.3056692142117345,
    "10310": -12.709948647547177,
    "10311": -14.299174085356585,
    "10314": -7.448910813733134,
    "10451": -7.612369209693022,
    "10452": -11.860556403602331,
    "10453": -11.61568359033001,
    "10454": -6.044073518403322,
    "10455": -11.807087343053338,
    "10456": -10.279536249675848,
    "10457": -11.463118371713216,
    "10458": -0.351688271155256,
    "10459": -9.949422615124845,
    "10460": -14.135755090859195,
    "10461": -10.708795523571261,
    "10462": -9.158579422057146,
    "10463": -12.554316772547384,
    "10464": -9.28138154557639,
    "10465": -15.986327155175251,
    "10466": -10.944769674251408,
    "10467": -9.263745430146061,
    "10468": -10.635028362764563,
    "10469": -20.106335571400034,
    "10470": -9.992494153557908,
    "10471": -6.97654891239537,
    "10472": -16.208872231695572,
    "10473": -10.062745568407834,
    "10474": -10.617468456704582,
    "10475": -9.93588910022684,
    "11096": -14.1233099371538,
    "11101": -10.987811746184667,
    "11102": -10.363498291434409,
    "11103": -10.281137746218477,
    "11104": -8.029992223453476,
    "11105": -10.340952987005767,
    "11106": -10.706731219962062,
    "11109": -12.383883642783987,
    "11201": -14.451504290419667,
    "11203": -11.400498704578762,
    "11204": -10.47141171323872,
    "11205": -17.15379746505111,
    "11206": -11.942186153335697,
    "11207": -13.821444212117097,
    "11208": -8.579061583040714,
    "11209": -14.697570705972238,
    "11210": -13.159495112393323,
    "11211": -12.255144649187125,
    "11212": -10.704887063528478,
    "11213": -14.949835997499635,
    "11214": -11.496124767017035,
    "11215": -3.424089262465281,
    "11216": -9.04051014941904,
    "11217": -7.91426345260289,
    "11218": -10.181582739813898,
    "11219": -10.617937785205292,
    "11220": -7.41991704892494,
    "11221": -13.136817186782393,
    "11222": -10.609309614152263,
    "11223": -10.149661810242014,
    "11224": -10.88037025941082,
    "11225": -10.068072704148962,
    "11226": -9.329261228778776,
    "11228": -13.189507352711312,
    "11229": -15.98205233561763,
    "11230": -5.750317221036926,
    "11231": -10.696859604351998,
    "11232": -14.577485359069001,
    "11233": -11.659932184589861,
    "11234": -16.24897890083264,
    "11235": -10.701949493073789,
    "11236": -8.30689493888053,
    "11237": -5.702835471165,
    "11238": -10.281137746218493,
    "11239": -11.496597503620368,
    "11249": -14.426914077416459,
    "11354": -11.462200458077406,
    "11355": -9.78676631891743,
    "11356": -10.824602240972967,
    "11357": -13.232577094111129,
    "11358": -12.114481761410879,
    "11359": -15.594807061523062,
    "11360": -14.431016284654747,
    "11361": -11.333603875160573,
    "11363": -8.196065952387578,
    "11364": -12.716930275563831,
    "11365": -12.9305369731032,
    "11366": -12.863719370019847,
    "11367": -14.309285203518158,
    "11368": -13.517983979077723,
    "11369": -15.303661399539347,
    "11370": -4.0721841670032255,
    "11371": -16.780907201844233,
    "11372": -9.729225091344013,
    "11373": -11.842567336561979,
    "11374": -10.73266372657105,
    "11375": -10.091316523116031,
    "11377": -10.887203334301894,
    "11378": -17.29990281508123,
    "11379": -11.086308207722439,
    "11385": -11.677165985151332,
    "11412": -11.109916304766715,
    "11413": -10.660859188502423,
    "11414": -8.654867639970742,
    "11415": -13.390351750027973,
    "11416": -19.220277648398987,
    "11417": -13.698515621739961,
    "11418": -7.455366733486028,
    "11419": -18.14842485596601,
    "11420": -9.905129204594047,
    "11421": -7.080380976197176,
    "11423": -10.377503551218066,
    "11427": -11.581358514485682,
    "11430": -7.062654717452993,
    "11432": -9.14480560972124,
    "11433": -11.025612446171044,
    "11434": -1.845244891964809,
    "11435": -13.682247901454899,
    "11436": -9.962624254572171,
    "11691": -8.596574367896135,
    "11692": -8.878018839891148,
    "11693": -14.835827473266667,
    "11694": -12.200547392793872,
    "11697": -11.837032736397964
}

@pytest.fixture
def mock_prediction_service(monkeypatch):
    
    mock_service = MockPredictionService()
    def mock_get_prediction_service():
        return MockPredictionService()
    
    monkeypatch.setattr("services.prediction.PredictionService", mock_get_prediction_service)

valid_test_data = {
    "data": {
                    "businessType": "Industry_Commercial Lessor",
                    "openHour": 8,
                    "closeHour": 18,
                    "budget": 20,
                    "selectedAgeGroup": [
                        11,
                        59
                    ],
                    "ageImportance": 0.5,
                    "selectedIncomeLevel": [
                        18000,
                        84000
                    ],
                    "incomeImportance": 0.5,
                    "targetGroup": [
                        "Singles"
                    ],
                    "proximityImportance": 0.5,
                    "footfallImportance": 0.5,
                    "surroundingBusinessesImportance": 0.5,
                    "rentBudget": 500,
                    "genderRatio": 0.5,
                    "employmentStatus": [
                        "Full Time"
                    ],
                    "homeValue": 50,
                    "populationDensity": 0.5,
                    "selectedBoroughs": [
                        "Manhattan",
                        "Brooklyn",
                        "Queens"
                    ],
                    "areaType": [
                        "Residential"
                    ]
    }
}

# Unit Tests
def test_predict_valid_data(mock_prediction_service):
    response = client.post("/api/v1/predict", json=valid_test_data)
    assert response.status_code == 200
    assert "predictions" in response.json()
    predictions = response.json()["predictions"]
    assert len(predictions) == 196
    assert '10001' in predictions
    assert '10002' in predictions

def test_predict_missing_data(mock_prediction_service):
    invalid_data = {"data": {}}
    response = client.post("/api/v1/predict", json=invalid_data)
    assert response.status_code == 422  # Unprocessable Entity

def test_predict_missing_field(mock_prediction_service):
    invalid_data = valid_test_data.copy()
    invalid_data["data"]["targetGroup"] = None
    response = client.post("/api/v1/predict", json=invalid_data)
    assert response.status_code == 422

def test_predict_out_of_range_values(mock_prediction_service):
    invalid_data = valid_test_data.copy()
    invalid_data["data"]["ageImportance"] = 2.0  # Should be between 0 and 1
    response = client.post("/api/v1/predict", json=invalid_data)
    assert response.status_code == 422

# Integration Tests
@pytest.mark.integration
def test_predict_integration_valid_data():
    response = client.post("/api/v1/predict", json=valid_test_data)
    assert response.status_code == 200
    assert "predictions" in response.json()
    predictions = response.json()["predictions"]
    assert len(predictions) == 196  
    assert all(isinstance(key, str) and isinstance(value, float) for key, value in predictions.items())

@pytest.mark.integration
def test_predict_integration_performance():
    import time
    start_time = time.time()
    response = client.post("/api/v1/predict", json=valid_test_data)
    end_time = time.time()
    assert response.status_code == 200
    assert end_time - start_time < 5  

@pytest.mark.integration
def test_predict_integration_missing_data():
    invalid_data = {"data": {}}
    invalid_data["data"]["businessType"] = "Invalid_Business_Type"
    response = client.post("/api/v1/predict", json=invalid_data)
    assert response.status_code == 422
    assert "detail" in response.json()

@pytest.mark.integration
def test_predict_integration_invalid_data():
    invalid_data = valid_test_data.copy()
    invalid_data["data"]["businessType"] = "Invalid_Business_Type"
    response = client.post("/api/v1/predict", json=invalid_data)
    assert response.status_code == 422
    assert "detail" in response.json()

@pytest.mark.integration
def test_predict_integration_missing_field():
    invalid_data = valid_test_data.copy()
    del invalid_data["data"]["businessType"]
    response = client.post("/api/v1/predict", json=invalid_data)
    assert response.status_code == 422
    assert "detail" in response.json()