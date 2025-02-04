package projector_test

import (
	"reflect"
	"testing"

	"github.com/peterculazh/projector/pkg/projector"
)

func getOpts(args []string) *projector.Opts {
	opts := &projector.Opts{
		Args:   args,
		Config: "",
		Pwd:    "",
	}
	return opts
}

func testConfig(t *testing.T, args []string, expectedArgs []string, operation projector.Operation) {
	opts := getOpts(args)
	config, err := projector.NewConfig(opts)
	if err != nil {
		t.Errorf("expected to get no error %v", err)
	}

	if !reflect.DeepEqual(expectedArgs, config.Args) {
		t.Errorf("expected args to be %+v but got %+v", expectedArgs, config.Args)
	}

	if config.Operation != operation {
		t.Errorf("expected operation %v but got operation %v", operation, config.Operation)
	}

}

func TestConfigPrint(t *testing.T) {
	testConfig(t, []string{}, []string{}, projector.Print)
}

func TestConfigPrintKey(t *testing.T) {
	testConfig(t, []string{"foo"}, []string{"foo"}, projector.Print)
}

func TestConfigAddKeyValue(t *testing.T) {
	testConfig(t, []string{"add", "foo", "bar"}, []string{"foo", "bar"}, projector.Add)
}

func TestConfigAddRemoveValue(t *testing.T) {
	testConfig(t, []string{"rm", "foo"}, []string{"foo"}, projector.Remove)
}
